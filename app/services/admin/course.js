const  {Course, User, Subject} = require('../../../models')

module.exports.course = async (req,res) => {
  try{
    const courses = await Course.findAll({include: [{ 
        model: Subject,
          through: {
            as: 'coursesubjects'
          }},
        'students',
      ]});
    res.render('admin/courses/courses', {courses:courses, path:"courses"})
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
    const course = await Course.create(data);
    res.redirect('/admin/courses');
  } catch (error) {
    console.log(error);
    res.render('500', {error:error})
  }
}

module.exports.update = async (req,res) => {
  const uuid = req.params.uuid;
  if(!req.body) {
    res.status.redirect('/admin/courses');
    return;
  } else {
    try {
      const data = {}
      for(const key of Object.keys(req.body)) {
        data[key] = req.body[key]
      }
      const course = await Course.findOne({where:{uuid}});
      course.update(data);
      res.redirect('/admin/courses');
    } catch (error) {
      console.log(error);
      res.render('500', {error:error, path:"error"})
    }
  }
}

module.exports.view = async (req,res) => {
  const uuid = req.params.uuid;
  const course = await Course.findOne({where:{uuid}, include: [{model:Subject, through: {as:'coursesubjects'}}]});
  const subjects = await Subject.findAll();
  if(course) {
    res.render('admin/courses/view', {course:course, subjects:subjects, path:"courses"})
  }
}

module.exports.addsubjects = async (req,res) => {
  const uuid = req.params.uuid;
  const subuuid=[];
  for(const key of Object.keys(req.body)){
    subuuid.push(req.body[key]);  
  }
  try {
    const subjects = await Subject.findAll({ where: {
      uuid:subuuid
    }});
    const course = await Course.findOne({where:{uuid}});
    course.addSubjects(subjects)
    res.redirect(`/admin/courses/${uuid}`)

  } catch (error) {
    console.log(error);
    res.render('500', {error:error, path:"error"})
  }
  
}

module.exports.removesubject = async (req,res) => {
  const courseuuid = req.params.uuid
  const subid = req.params.id
  try {
    const course = await Course.findOne({where:{uuid:courseuuid}});
    const subject = await Subject.findOne({where:{id:subid}});
    course.removeSubject(subject);
    res.redirect(`/admin/courses/${courseuuid}`);
  } catch (error) {
    console.log(error);
    res.render('500', {error:error, path:"courses"})
  }
  
}