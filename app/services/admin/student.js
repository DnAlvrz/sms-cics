const  {User, Course} = require('../../../models');
const bcrypt = require('bcrypt');

module.exports.list = async (req,res) => {
  try{
    const students = await User.findAll({where:{roles:'student'}, include:'course'});
    const courses = await Course.findAll();
    res.render('admin/student/list', {students:students, courses:courses})
  } catch(error) {
    console.log(error);
    res.render('500', {error:error})
  }
}
module.exports.new = async (req,res) => {
  if(!req.body) {
    res.redirect('/admin/students');
    return;
  } 

  const data = {};
  for(const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.schoolId, salt)
    data.password = hashedPassword;
    const user = await User.create(data);
    const course = await Course.findOne({where:{uuid:req.body.course}});
    course.addStudent(user);
    res.redirect('/admin/students');
  } catch (error) {
    console.log(error);
    res.render('500', {error:error})
  }
}