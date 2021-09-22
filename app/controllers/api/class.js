const {Class} = require('../../../models');
const util = require('../../util/util')

module.exports.get = async (req,res) => {
  try {
    const classes = await Class.findAll();
    res.status(200).json(classes)
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }
}
module.exports.create = async (req,res) => {
  if(!req.body) {
    res.status(400).json({message:"Please send valid JSON data"});
  } else {
    const data = util.createObject(req.body);
    try {
      const newClass = await Class.create(data);
      res.status(201).json(newClass);
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
    }
  }
}
module.exports.find = async (req,res) => {
  const uuid = req.params.uuid;
  try {
    const matchingClass = await Class.findOne({where:uuid});
    res.status(200).json(matchingClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
}
module.exports.update = async (req,res) => {
  if(!req.body) {
    res.status(400).json({message:"Please send valid JSON data"});
  } else {
    const uuid = req.params.uuid
    try {
      const matchingClass = await Class.findOne({where:uuid});
      for(const key of Object.keys(req.body)) {
        matchingClass[key] = req.body[key];
      }
      const updatedClass = await matchingClass.save();
      res.status(200).json(updatedClass);
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
    }
  }
  
}
module.exports.delete = async (req,res) => {
  const uuid = req.params.uuid
  try {
    const matchingClass = await Class.findOne({where:uuid});
    await matchingClass.destroy()
    res.status(200).json({message: "Class deleted."})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
}