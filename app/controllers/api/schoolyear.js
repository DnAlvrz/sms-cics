const {AcademicYear} = require('../../../models');
const util = require('../../util/util');

module.exports.get = async (req, res) => {
  try {
    const schoolyears = await AcademicYear.findAll();
    res.status(200).json(schoolyears)

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "something went wrong"});
  }
}

module.exports.create = async (req, res) => {
  if(!req.body) {
    res.status(400).json({message:"Please send valid json data."})
  } else {
    const data = util.createObject(req.body)
    try {
      const newSchoolYear = await AcademicYear.create(data);
      res.status(200).json(newSchoolYear)

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "something went wrong"});
    }
  }
  
}

module.exports.find = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const schoolyear = await AcademicYear.findOne({where:{uuid}});
    res.status(200).json(schoolyear)
  } catch (error) {
    console.log(error)
    res.status(200).json({message: "Something went wrong"})
  }
}


module.exports.update = async (req, res) => {
  const uuid = req.params.uuid;
  if(!req.body) {
    res.status(400).json({message:"Please send valid json data."})
  } else {
    try {
      const schoolyear = await AcademicYear.findOne({where:{uuid}});
      for(const key of Object.keys(req.body)) {
        schoolyear[key] = req.body[key];
      }
      const updateSchoolYear = await schoolyear.save();
      res.status(200).json(updateSchoolYear)
    } catch (error) {
      console.log(error)
      res.status(200).json({message: "Something went wrong"})
    }
  }
}

module.exports.delete = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const schoolyear = await AcademicYear.findOne({where:{uuid}});
    await schoolyear.destroy();
    res.status(200).json({message: "School Year Deleted"})
  } catch (error) {
    console.log(error)
    res.status(200).json({message: "Something went wrong"})
  }
}