const {Class} = require('../../../models');


module.exports.list = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.render('admin/classes/list', {classes:classes, path:'classes'});
  } catch (error) {
    
  }
}