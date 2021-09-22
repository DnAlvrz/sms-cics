const { restart } = require('nodemon');
const  {Course, User, Subject} = require('../../../models')

module.exports.course = async (req,res) => {
  try{
    const courses = await Course.findAll({include: [
      'students',
    ]
  });
    res.render('admin/courses/courses', {courses:courses})
  } catch(error) {
    console.log(error);
    res.render('500', {error:error})
  }
}
module.exports.new = async (req,res) => {
  if(!req.body) {
    res.redirect('/admin/courses');
    return;
  } 
  const data = {};
  for(const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }
  try {
    console.log(data)
    const course = await Course.create(data);
    res.redirect('/admin/courses');
  } catch (error) {
    console.log(error);
    res.render('500', {error:error})
  }
}

module.exports.view = async (req,res) => {
  const uuid = req.params.uuid;
  const course = await Course.findOne({where:{uuid}});
  if(course) {
    res.render('admin/courses/view', {course:course})
  }
}