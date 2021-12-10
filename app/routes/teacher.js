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
router.get('/:classId', teacherHandlers.classView );
router.put('/:classId/grades/:studentId', teacherHandlers.addGrade );



module.exports = router;