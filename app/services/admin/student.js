const { User, Course, Class, Grade, Subject, AcademicYear, Prereq } = require('../../../models');
const bcrypt = require('bcrypt');

module.exports.list = async(req, res) => {
  try {
    const students = await User.findAll({ where: { roles: 'student' }, include: 'course' });
    const courses = await Course.findAll();
    res.render('admin/student/list', { students: students, courses: courses, path: "students" })
  } catch (error) {
    console.log(error);
    res.render('500', { error: error })
  }
}

module.exports.new = async(req, res) => {
    if (!req.body) {
      res.redirect('/admin/students');
      return;
    }

    const data = {};
    for (const key of Object.keys(req.body)) {
      data[key] = req.body[key]
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.schoolId, salt)
      data.password = hashedPassword;
      const user = await User.create(data);
      const course = await Course.findOne({ where: { uuid: req.body.course } });
      course.addStudent(user);
      res.redirect('/admin/students');
    } catch (error) {
      console.log(error);
      res.render('500', { error: error })
    }
  }
  // Student view
module.exports.view = async(req, res) => {
  const studentId = req.params.id;
  try {
    const student = await User.findOne({
      where: { id: studentId },
      include: [
        'course',
        {
          model: Class,
          as: 'classlist',
          include: ['subject', 'schoolyear']
        },
        'grades'
      ]
    });
    const classes = await Class.findAll({
      include: [{
          model: AcademicYear,
          where: {
            isCurrentYear: 1
          },
          as: 'schoolyear'
        },
        'subject'
      ]
    })
    res.render('admin/student/student', { student, classes, path: "students", message: req.flash('message') })
  } catch (error) {
    console.log(error)
    res.render('500', { error, path: '' })
  }
}

module.exports.addClass = async(req, res) => {
  try {
    const student = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Grade,
        as: 'grades',
        include: [{
          model: Class,
          as: 'subject',
          include: ['subject']
        }]
      }, ]
    });
    const studentSubjects = req.body.classes;
    studentSubjects.forEach(async classId => {
      let passed = true;
      const matchClass = await Class.findOne({
        where: { id: classId },
        include: [{
          model: Subject,
          as: 'subject',
          include: [{
            model: Prereq,
            as: 'sub',
            include: ['prereq']
          }],
          right: true
        }]
      });
      if (matchClass.subject.sub !== null) {
        passed = false;
        console.log('prereq hit')
        console.log(matchClass.subject.sub.prereq.subCode)
        student.grades.forEach(grade => {
          if (grade.subject.subject.subCode == matchClass.subject.sub.prereq.subCode) {
            console.log('prerequisite match')
              //check if student has a passing grade;
            if (grade.grade <= 3 && grade.grade >= 1) {
              passed = true;
            }
          }
        })

      }
      if (passed) {
        matchClass.addStudent(student);
      } else {
        console.log(`student must take/pass ${matchClass.subject.sub.prereq.subCode} first to be able to proceed to ${matchClass.subject.subCode}`)
        req.flash("message", `student must take/pass ${matchClass.subject.sub.prereq.subCode} first`)
        res.redirect(`/admin/students/${req.params.id}`);
        console.log(req.flash('message'))
      }
    });
  } catch (error) {
    console.log(error);
    res.render('500', { error, path: "" });
  }
}