const  {Subject, Course} = require('../../../models');

module.exports.list = async (req,res) => {
  try {
    const subjects = await Subject.findAll();
    res.render('admin/subjects/list', {subjects:subjects, path:'subjects'});
  } catch (error) {
    res.render('500', {error:error})
  }
}
module.exports.new = async (req,res) => {
  if(!req.body) {
    res.redirect('admin/home');
    return;
  } 
  console.log(req.body)

  const data = {};
  for(const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }
  try {
    const subject = await Subject.create(data);
    res.redirect('/admin/subjects');
  } catch (error) {
    console.log(error);
    res.render('500', {error:error,  path:'error'})
  }
}