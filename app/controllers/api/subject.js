const {Course, Subject} = require('../../../models');

module.exports.get = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.create = async (req, res) => {
  if(!req.body) {
    res.status(400).json({message: "Please send valid data."});
  }
  const data = {};
  for(const key of Object.keys(req.body)) {
    data[key] = req.body[key];
  }
  try {
    const subject = await Subject.create(data);
    res.status(201).json({message:"Subject was created successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"})
  }
};

module.exports.find = async (req,res) => {
  const uuid = req.params.uuid;
  try {
    const subject = await Subject.findOne({where:{uuid}});
    res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something wen wrong"});
  }
};

module.exports.update = async(req, res) => {
  const uuid = req.params.uuid;  
  try {
    const subject = await Subject.findOne({where: {uuid}})
    for (const key of Object.keys(req.body)) {
      subject[key] = req.body[key];
    }
    const updatedSubject = await subject.save();
    res.status(201).json(updatedSubject);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }update
};

module.exports.delete  = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const subject = await Subject.findOne({where:{uuid}});
    await subject.destroy();
    res.status(200).json({message: "Subject deleted."})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }
};

