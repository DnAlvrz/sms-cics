const {User, Class} = require('../../../models/index');

module.exports.home = async (req, res) => {
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
}