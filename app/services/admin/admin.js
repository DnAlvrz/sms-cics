const axios = require('axios');
const {
    User,
    AcademicYear,
    Semester,
    Course
} = require('../../../models')
const {
    Op
} = require("sequelize");

module.exports.home = async(req, res) => {
    try {
        const user = await User.findAll({
            where: {
                [Op.or]: [{
                    roles: "student"
                }, {
                    roles: "teacher"
                }]
            },
            include: 'course'
        });
        res.render('admin/home', {
            users: user,
            path: 'home',
            user: req.user
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.schoolYear = async(req, res) => {
    try {
        const schoolyears = await AcademicYear.findAll({
            include: ['subjects', 'semesters']
        });
        res.render('admin/schoolyears', {
            schoolyears,
            path: 'schoolyears',
            message: req.flash('message')
        });
    } catch (error) {
        res.render('500')
    }
}



module.exports.newSchoolYear = async(req, res) => {
    if (!req.body) {
        res.render('admin/schoolyears');
    } else {
        const data = {};
        for (const key of Object.keys(req.body)) {
            data[key] = req.body[key];
        }
        try {
            const newSY = await AcademicYear.create(data);
            req.flash("message", "School year saved")
            res.status(201).redirect('/admin/schoolyears')
        } catch (error) {
            res.render('500.ejs', {
                error: error,
                path: 'error'
            })
        }
    }
}

module.exports.updateSchoolYear = async(req, res) => {
    const uuid = req.params.uuid;
    if (!req.body) {
        res.redirect('/admin/schoolyears');
    } else {
        try {
            const schoolyear = await AcademicYear.findOne({
                where: {
                    uuid
                }
            });
            for (const key of Object.keys(req.body)) {
                schoolyear[key] = req.body[key]
            }
            const updateSchoolYear = await schoolyear.save();
            res.redirect('/admin/schoolyears');
        } catch (error) {
            console.log(error)
            res.render('500')
        }
    }
}

module.exports.closeYear = async(req, res) => {
    const uuid = req.params.uuid;
    if (!req.body) {
        res.redirect('/admin/schoolyears');
    } else {
        try {
            const schoolyear = await AcademicYear.findOne({
                where: {
                    uuid
                }
            });
            schoolyear.isCurrentYear = false;
            const updateSchoolYear = await schoolyear.save();
            res.redirect('/admin/schoolyears');
        } catch (error) {
            console.log(error)
            res.render('500')
        }
    }
}
module.exports.openYear = async(req, res) => {
    const uuid = req.params.uuid;
    if (!req.body) {
        res.redirect('/admin/schoolyears');
    } else {
        try {
            const schoolyear = await AcademicYear.findOne({
                where: {
                    uuid
                }
            });
            schoolyear.isCurrentYear = true;
            const updateSchoolYear = await schoolyear.save();
            res.redirect('/admin/schoolyears');
        } catch (error) {
            console.log(error)
            res.render('500')
        }
    }
}

module.exports.semester = async(req, res) => {
    try {
        const semesters = await Semester.findAll({
            include: [{
                model: AcademicYear,
                as: "schoolyear",
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        });
        const schoolyears = await AcademicYear.findAll();
        res.render('admin/semesters', {
            semesters: semesters,
            schoolyears: schoolyears,
            path: 'semesters'
        });
    } catch (error) {
        res.render('500.ejs', {
            error: error
        })
    }
}

module.exports.newSemester = async(req, res) => {
    if (!req.body) {
        res.render('admin/schoolyear');
    } else {
        const name = req.body.name;
        const schoolYearUUID = req.body.schoolyearId
        try {
            const newSem = await Semester.create({
                name: name
            });
            const schoolYear = await AcademicYear.findOne({
                where: {
                    uuid: schoolYearUUID
                }
            });
            schoolYear.addSemester(newSem);
        } catch (error) {
            res.render('500.ejs', {
                error: error
            })
        }
        res.status(201).redirect('/admin/semesters')
    }
}

module.exports.updateSemester = async(req, res) => {
    if (!req.body) {
        req.flash("message", "Must submit valid data");
        res.redirect('/admin/semesters');
    } else {
        const name = req.body.name;
        const schoolYearUUID = req.body.schoolyearId
        try {
            const matchSem = await Semester.findOne({
                where: {
                    id: req.body.id
                }
            });
            for (const key of Object.keys(req.body)) {
                matchSem[key] = req.body[key];
            }
            const schoolYear = await AcademicYear.findOne({
                where: {
                    uuid: schoolYearUUID
                }
            });
            schoolYear.addSemester(matchSem);
            await matchSem.save();
            res.redirect('/admin/semesters')
        } catch (error) {
            res.render('500.ejs', {
                error: error
            })
        }
    }
}

module.exports.adminList = async(req, res) => {
    try {
        const admins = await User.findAll({
            where: {
                [Op.or]: [{
                    roles: 'admin'
                }, {
                    roles: 'superadmin'
                }]
            }
        });
        res.render('admin/admin/list', {
            teachers: admins,
            path: 'admin'
        });
    } catch (error) {
        res.render('500', {
            error: error
        })
    }
}