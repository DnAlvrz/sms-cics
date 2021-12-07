const router = require('express').Router();
const teacherHandlers = require('../services/teacher/teacher');

router.use((req,res, next) => {
  if(req.user.roles === "teacher" || req.user.roles === "admin" ){
    next();
    return;
  }
  res.redirect('/')
})

router.get('/', teacherHandlers.home );



module.exports = router;