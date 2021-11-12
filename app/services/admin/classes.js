const {Class, Course, Subject, AcademicYear, User, Grade} = require('../../../models');
const {Op} = require("sequelize");
const grade = require('../../../models/grade');
const util = require('../../util/util')

module.exports.list = async (req, res) => {
  try {
    const classes = await Class.findAll({include: [
      'subject',
      'course',
      'teacher'
    ]});
    const courses = await Course.findAll();
    const subjects = await Subject.findAll();
    const schoolyears = await AcademicYear.findAll();
    res.render('admin/classes/list', {classes, courses, schoolyears, subjects, path:"classes"});
  } catch (error) {
    console.log(error);
    res.render('500', {error, path:""});
  }
}

module.exports.new = async (req, res) => {
  if(!req.body) {
    res.status(400).redirect('/admin/classes');
  } else {
    const data = util.createObject(req.body);
    try {
      const newClass = await Class.create(data);
      const course = await Course.findOne({where:{uuid: data.courseId}});
      const subject = await Subject.findOne({where:{uuid:data.subjectId}});
      const schoolyear = await AcademicYear.findOne({where:{uuid:data.schoolyearId}});
      schoolyear.addSubject(newClass);
      course.addClass(newClass);
      subject.addClass(newClass);
      res.redirect('/admin/classes')
    } catch (error) {
      console.log(error);
      res.render('500', {error, path:""});
    }
  }
}

module.exports.view = async (req, res) => {
  try {
    const clas = await Class.findOne({where:{id:req.params.id},
      include: [
      'subject',
      'course',
      'schoolyear',
      'teacher',
      { 
        model: User,
          as: 'students',
          include: [
            'course'
          ]
      },
      'grades'
     ]
    });
    const courses = await Course.findAll();
    const subjects = await Subject.findAll();
    const schoolyears = await AcademicYear.findAll();
    const teachers = await User.findAll({where:{roles:'teacher'}});
    const students = await User.findAll({where:{roles:'student'}});
    res.render('admin/classes/class', {clas, courses,teachers,students, schoolyears, subjects, path:"classes"});
  } catch (error) {
    console.log(error);
    res.render('500', {error,path:""});
  }
}

module.exports.update = async (req, res) => {
  try {
    const clas = await Class.findOne({where:{id:req.params.id}});
    for(const key of Object.keys(req.body)) {
      clas[key] = req.body[key];
    }
    const subject = await Subject.findOne({where:{uuid:req.body.subjectUUID}});
    const course = await Course.findOne({where:{uuid:req.body.courseUUID}});
    const schoolyear = await AcademicYear.findOne({where:{uuid:req.body.schoolyearUUID}});
    schoolyear.addSubject(clas);
    course.addClass(clas);
    subject.addClass(clas);
    await clas.save();
    res.redirect(`/admin/classes/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.render('500', {error,path:""});
  }
}

module.exports.addTeacher = async (req, res) => {
  if(!req.body) {
    res.status(400).redirect('/admin/classes');
  } else {
    console.log(req.body.teacheruuid)
    try {
      const clas = await Class.findOne({where:{id:req.params.id}});
      const teacher = await User.findOne({where:{uuid:req.body.teacheruuid}});
      //clas.addTeacher(teacher);
      teacher.addClass(clas)
      res.redirect(`/admin/classes/${req.params.id}`)
    } catch (error) {
      console.log(error);
      res.render('500', {error, path:""});
    }
  }
}

module.exports.addStudents = async (req, res) => {
  if(!req.body) {
    res.status(400).redirect('/admin/classes');
  } else {
    console.log(req.body.teacheruuid)
    try {
      const clas = await Class.findOne({where:{id:req.params.id}});
      const teacher = await User.findOne({where:{uuid:req.body.teacheruuid}});
      //clas.addTeacher(teacher);
      teacher.addClass(clas)
      res.redirect(`/admin/classes/${req.params.id}`)
    } catch (error) {
      console.log(error);
      res.render('500', {error, path:""});
    }
  }
}

module.exports.addStudents = async (req,res) => {
  const id = req.params.id;
  const studentuuid=[];
  for(const key of Object.keys(req.body)){
    studentuuid.push(req.body[key]);  
  }
  try {
    const students = await User.findAll({ where: {
      uuid:studentuuid
    }});
    const clas = await Class.findOne({where:{id}, include:['students']});
    let i = 0;
    console.log('Number of students : ',clas.students.length , 'max cap: ', clas.maxNumberofStudents)
    if(clas.students.length < clas.maxNumberofStudents){
      students.forEach(student => {
        clas.addStudent(student);
      });
    }  
    res.redirect(`/admin/classes/${req.params.id}`)

  } catch (error) {
    console.log(error);
    res.render('500', {error:error, path:"error"})
  }
  
}

module.exports.addGrade = async (req,res) => {
  const id = req.params.id;
  const studentId = req.params.studentId;
  try {
    const matchClass = await Class.findOne({where:{id}});
    const matchStudent = await User.findOne({where: {id:studentId}});
    const matchGrade = await Grade.findOne({
      where:{
       [Op.and]: [{classId: matchClass.id}, {studentId:matchStudent.id}]
      }
    })
    if(matchGrade === null) {
      console.log('Null hit');
      data = {
        grade:req.body.grade
      }
      const newGrade = await Grade.create(data);
      matchStudent.addGrade(newGrade);
      matchClass.addGrade(newGrade);

    } else {
      matchGrade.grade = req.body.grade;
      const updatedGrade = await matchGrade.save();
      matchStudent.addGrade(matchGrade);
      matchClass.addGrade(matchGrade);
    }
    
    res.redirect(`/admin/classes/${req.params.id}`)
  } catch (error) {
    console.log(error);
    res.render('500', {error:error, path:"error"})
  }
  
}