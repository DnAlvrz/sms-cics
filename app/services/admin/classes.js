const {Class, Course, Subject} = require('../../../models');
const util = require('../../util/util')

module.exports.list = async (req, res) => {
  try {
    const classes = await Class.findAll({include: [
      'subject',
      'course'
    ]});
    const courses = await Course.findAll();
    const subjects = await Subject.findAll();
    res.render('admin/classes/list', {classes, courses, subjects, path:"classes"});
  } catch (error) {
    console.log(error);
    res.render('500', {error,path:""});
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
      course.addClass(newClass);
      subject.addClass(newClass);
      res.redirect('/admin/classes')
    } catch (error) {
      console.log(error);
      res.render('500', {error, path:""});
    }
  }
}