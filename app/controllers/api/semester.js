const {Semester} = require('../../../models');


module.exports.get = async (req, res) => {
  try {
    const semester = await Semester.findAll();
    res.status(200).json(semester);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
}


module.exports.create = async (req,res) => {
  if(!req.body) {
    res.status(400).json({message:"please send valid data"});
  } else {
    const data = {};
    for(const key of Object.keys(req.body)) {
      data[key] = req.body[key];
    }
    try {
      const semester = await Semester.create(data);
      res.status(201).json(semester);
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
    }
  }
}

module.exports.find = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const semester = await Semester.findOne({where:{uuid}});
    res.status(200).json(semester);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
}


module.exports.update = async (req, res) => {
  const uuid = req.params.uuid;
  if(!req.body) {
    res.status(400).json({message:"Something went wrong"});
  }
  try {
    const semester = await Semester.findOne({where:{uuid}});
    res.status(200).json(semester);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
}

module.exports.delete = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const semester = await Semester.findOne({where:{uuid}})
    await semester.destroy();
    res.status(200).json({message: "Semester deleted."})
  } catch (error) {
    console.log(error);
    res.status(200).json({message:"Something went wrong"})
  }
}