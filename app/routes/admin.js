const router = require('express').Router();
// const userservices = require('../controllers/userapiservices')
const adminRoutes = require('../services/admin/admin');
const adminCourseRoutes = require('../services/admin/course');
const adminStudentRoutes = require('../services/admin/student');
const adminSubjectRoutes = require('../services/admin/subject');
const adminClassRoutes = require('../services/admin/classes');
const adminFacultyRoutes = require('../services/admin/faculty');

router.use((req,res, next) => {
  if(req.user.roles === "admin" || req.user.roles === "superadmin" ){
    next();
    return;
  }
  res.redirect('/')
})

router.get('/',adminRoutes.home);
// School Years
router.get('/schoolyears',adminRoutes.schoolYear);
router.post('/schoolyears',adminRoutes.newSchoolYear);
//Semesters
router.get('/semesters',adminRoutes.semester);
router.post('/semesters',adminRoutes.newSemester);

//Courses
router.get('/courses', adminCourseRoutes.course);
router.post('/courses', adminCourseRoutes.new);
router.get('/courses/:uuid', adminCourseRoutes.view);
router.put('/courses/:uuid', adminCourseRoutes.update);
router.post('/courses/:uuid/add-subjects', adminCourseRoutes.addsubjects);
router.get('/courses/remove/:uuid/:id', adminCourseRoutes.removesubject);

// Students
router.get('/students', adminStudentRoutes.list);
router.post('/students', adminStudentRoutes.new);
router.get('/students/:id', adminStudentRoutes.view);

// Subjects
router.get('/subjects', adminSubjectRoutes.list);
router.post('/subjects', adminSubjectRoutes.new);

// Classes
router.get('/classes', adminClassRoutes.list);
router.post('/classes', adminClassRoutes.new);
router.get('/classes/:id', adminClassRoutes.view);
router.put('/classes/:id', adminClassRoutes.update);
router.put('/classes/:id/grades/:studentId', adminClassRoutes.addGrade);
router.post('/classes/:id/add-teacher', adminClassRoutes.addTeacher);
router.post('/classes/:id/add-student', adminClassRoutes.addStudents);


// teachers
router.get('/teachers', adminFacultyRoutes.list);
router.post('/teachers', adminFacultyRoutes.new);
//admins
router.get('/admins', adminRoutes.adminList);

module.exports = router;


//router.get('/students', adminRoutes.students);
// router.get('/students/new',adminRoutes.newStudent);
// router.get('/students/:uuid/update', adminRoutes.updateStudent);

// router.post('/', userservices.create)
// router.get('/:uuid', userservices.find)
// router.patch('/:uuid', userservices.update)
// router.delete('/:uuid', userservices.delete)
