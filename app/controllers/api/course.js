const {Course, User} = require('../../../models/');

module.exports.get = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
  }
}

module.exports.create = async (req, res) => {
  if(!req.body) {
    res.status(400).json({message: "Need data in order to create Course"})
    return;
  }
  const data = {};
  for (const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }
  
  try {
    //const user = await User.findOne({where:{uuid:data.uuid}});
    const course = await Course.create(data);
    res.status(201).json({message:"Course created", course:course})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }
}

module.exports.find = async(req, res) => {
  const uuid = req.params.uuid
  try {
    const course = await Course.findOne({where:{uuid}})
    res.status(200).json(course)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }
}

module.exports.update = async(req, res) => {
  const uuid = req.params.uuid  
  try {
    const course = await Course.findOne({where: {uuid}})
    for (const key of Object.keys(req.body)) {
      course[key] = req.body[key]
    }
    const updatedCourse = await course.save();
    res.status(201).json(updatedCourse);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }update
}

module.exports.delete = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const course = await Course.findOne({where: {uuid}});
    await course.destroy();
    res.status(200).json({message:"Course Deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "something went wrong"})
  }
}

module.exports.addUser = async (req, res) => {
  const userUUID = req.body.userUUID
  const courseUUID = req.params.uuid
  try{
    const user = await User.findOne({where:{uuid:userUUID}});
    const course = await Course.findOne({where:{uuid:courseUUID}});
    await course.addUser(user)
    res.status(201).json({message:'Student added to course'});
  } catch(err) {
    console.log(err)
    res.status(500).json({message:"Something went wrong"});
  }
  
}


module.exports.addSubjects = async (req, res) => {
}