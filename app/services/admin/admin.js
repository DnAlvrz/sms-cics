const axios = require('axios');
const {User, AcademicYear, Semester, Course} = require('../../../models')
const {Op} = require("sequelize");

module.exports.home = async (req,res) => {
  try {
    const user = await User.findAll({
      where:{
        [Op.or]: [{roles: "student"}, {roles:"teacher"}]
      },
      include: 'course'
  });
    res.render('admin/home', {users:user});
  } catch (error) {
    console.log(error);

  }
}

module.exports.schoolYear = async (req,res) => {
  try {
    const schoolyears = await AcademicYear.findAll();
    res.render('admin/schoolyears', { schoolyears: schoolyears});
  } catch (error) {
    console.log(error);
  }
  res.render('admin/schoolyears')
}

module.exports.newSchoolYear = async (req,res) => {
  if(!req.body) {
    res.render('admin/schoolyears');
  } else {
    const data = {};
    for(const key of Object.keys(req.body)) {
      data[key]= req.body[key];
    }
    try {
      const newSY = await AcademicYear.create(data);
    } catch (error) {
      res.render('500.ejs', {error:error})
    }
    res.status(201).redirect('/admin/schoolyears')
  }
}

module.exports.semester = async (req,res) => {
 try {
   const semesters = await Semester.findAll({
     include:[{
      model:AcademicYear,
      as: "schoolyear",
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }]
  });
   const schoolyears = await AcademicYear.findAll();
   res.render('admin/semesters',{semesters:semesters, schoolyears:schoolyears});
 } catch (error) {
   res.render('500.ejs', {error:error})
 }
}
module.exports.newSemester = async (req,res) => {
  if(!req.body) {
    res.render('admin/schoolyear');
  } else {
    const name = req.body.name;
    const schoolYearUUID = req.body.schoolyearId
    try {
      const newSem = await Semester.create({name:name});
      const schoolYear = await AcademicYear.findOne({where:{uuid:schoolYearUUID}});
      schoolYear.addSemester(newSem);
    } catch (error) {
      res.render('500.ejs', {error:error})
    }
    res.status(201).redirect('/admin/schoolyears')
  }
}

module.exports.newSemester = async (req,res) => {
  if(!req.body) {
    res.render('admin/schoolyear');
  } else {
    const name = req.body.name;
    const schoolYearUUID = req.body.schoolyearId
    try {
      const newSem = await Semester.create({name:name});
      const schoolYear = await AcademicYear.findOne({where:{uuid:schoolYearUUID}});
      schoolYear.addSemester(newSem);
    } catch (error) {
      res.render('500.ejs', {error:error})
    }
    res.status(201).redirect('/admin/schoolyears')
  }
}

