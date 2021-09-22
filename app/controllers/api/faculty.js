const {User} = require('../../../models');

module.exports.get = async (req, res) => {
  try {
    const users = await User.findAll({where:{roles:'faculty'}});
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
  }
}

module.exports.create = async (req, res) => {
  if(!req.body) {
    res.status(400).json({message: "Need data in order to create user"})
    return;
  }
  const data = {};
  for (const key of Object.keys(req.body)) {
    data[key] = req.body[key]
  }
  try {
    const user = await User.create(data);
    res.status(201).json({message:"User created", user:user});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }
}

module.exports.find = async(req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({where:{uuid}})
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }
}

module.exports.update = async(req, res) => {
  const uuid = req.params.uuid  
  try {
    const user = await User.findOne({where: {uuid}})
    for (const key of Object.keys(req.body)) {
      user[key] = req.body[key]
    }
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"});
  }update
}

module.exports.delete = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({where: {uuid}});
    await user.destroy();
    return res.status(200).json({message:"User Deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "something went wrong"})
  }
}

module.exports.addSubject = async (req, res) => {
  try {
    const userUuid = req.body.uuid;
    
  } catch (error) {
    
  }
}