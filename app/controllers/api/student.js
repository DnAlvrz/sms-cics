const {User, Course} = require('../../../models');

module.exports.get = async (req, res) => {
  try {
    const users = await User.findAll({ 
      where:{
        roles:'student'
      },
      attributes: {
        exclude: ['createdAt', 'roles', 'updatedAt']
      },
      include:[{
        model:Course,  
        as: "course",
        attributes:['name']
      }]
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"});
  }
};

module.exports.create = async (req, res) => {
  if(!req.body) {
    res.status(400).json({message:"Please send valid data"});
  } else {
    const data = {};

    for(const key of Object.keys(req.body)){
      data[key] = req.body[key];
    }
    
    try {
      const course = await Course.findOne({where:{uuid:req.body.courseID}})
      console.log(course)
      const user = await User.create(data);
      await course.addStudent(user);
      res.status(201).json({message:"Successfully added new user.", student:user});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
    }
  }
};

module.exports.find = async (req,res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({where:{uuid}, include: "course"});
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }
}

module.exports.update = async (req,res) => {
  if(!req.body){
    res.status(400).json({message:"Please send valid data."})
  } else {
    const uuid = req.params.uuid;
    try {
      const user = await User.findOne({where:{uuid}});
      for(const key of Object.keys(req.body)){
        user[key] = req.body[key];
      } 
      const updatedUser = await user.save({include:"course"});
      if(req.body.courseID){
        console.log(req.body.courseID)
        const course = await Course.findOne({where:{uuid:req.body.courseID}});
        course.addstudent(updatedUser);
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Something went wrong"});
    }
  }
}

module.exports.delete = async (req,res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({where:{uuid}});
    await user.destroy();
    res.status(200).json({message: "User deleted."})
  } catch (error) {
    res.status(500).json({message: "Something went wrong"})
  }
}