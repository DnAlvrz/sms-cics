const router = require('express').Router();
const student = require('../../controllers/api/student')
router.get('/', student.get)
// router.post('/', student.create)
// router.get('/:uuid', student.find)
// router.patch('/:uuid', student.update)
// router.delete('/:uuid', student.delete)

module.exports = router;