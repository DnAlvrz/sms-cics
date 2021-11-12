const  {User} = require('../../../models');
const util = require('../../util/util');
const bcrypt = require('bcrypt');
module.exports.list = async (req,res) => {
  try {
    const teachers = await User.findAll({where: {
      roles:'teacher'
    }});
    res.render('admin/faculty/list', {teachers:teachers, path:'teachers'});
  } catch (error) {
    res.render('500', {error:error})
  }
}

module.exports.new = async (req,res) => {
  if(!req.body) {
    res.status(400).redirect('/admin/teachers');
  } else {
    const data = util.createObject(req.body);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.schoolId, salt)
      data.password = hashedPassword;
      const newClass = await User.create(data);
      res.redirect('/admin/teachers')
    } catch (error) {
      console.log(error);
      res.render('500', {error, path:""});
    }
  }
}
