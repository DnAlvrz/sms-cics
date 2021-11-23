const  {Subject, Course, Prereq} = require('../../../models');

module.exports.list = async (req,res) => {
  try {
    const subjects = await Subject.findAll({
      include:[{
          model:Prereq,
          as:'sub',
          include:['prereq']
        }]
    });
    console.log(subjects[1].sub)
    res.render('admin/subjects/list', {subjects:subjects, path:'subjects'});
  } catch (error) {
    console.log(error)
    res.render('500', {error:error})
  }
}

module.exports.new = async (req,res) => {
  if(!req.body) {
    res.redirect('admin/home');
    return;
  }
  const data = {};
  for(const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }
  try {
    const subject = await Subject.create(data);
    if(data.prereq != "None") {
      console.log(data.prereq)
      const prereqdata = {
        preReqId: data.prereq
      }
      const prereq = await Prereq.create(prereqdata);
      prereq.subId = subject.id;
      await prereq.save();
      console.log(prereq);
    }
    res.redirect('/admin/subjects')
  } catch (error) {
    console.log(error);
    res.render('500', {error:error,  path:'error'})
  }
}