const {User, Class, Grade} = require('../../../models/index');
const {Op} = require("sequelize");

module.exports.home = async (req, res) => {
  try {
    const teacher = await User.findOne({
      where:{
        id: req.user.id,
        roles: "teacher"
      },
      include:[
        {
          model: Class,
          as: 'classes',
          include: ['schoolyear', 'subject', 'students']
        }
      ]
    });
    res.render("faculty/home", {teacher, path:'Home'});
  } catch (err) {
    console.log(error);
    res.render("500", {error});
  }
  

}


module.exports.classView = async (req, res) => {
  try {
    const clas = await Class.findOne({where:{id:req.params.classId},
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
    res.render('faculty/class', {clas, path:"classes"});
  } catch (error) {
    console.log(error);
    res.render('500', {error,path:""});
  }
}

module.exports.addGrade = async (req,res) => {
  const id = req.params.classId;
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
    
    res.redirect(`/teacher/${req.params.classId}`)
  } catch (error) {
    console.log(error);
    res.render('500', {error:error, path:"error"})
  }
  
}