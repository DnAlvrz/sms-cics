const router = require('express').Router();
const semester = require('../../controllers/api/semester')
router.get('/', semester.get)
// router.post('/', semester.create)
// router.get('/:uuid', semester.find)
// router.patch('/:uuid', semester.update)
// router.delete('/:uuid', semester.delete)

module.exports = router;