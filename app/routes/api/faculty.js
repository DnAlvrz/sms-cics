const router = require('express').Router();
const faculty = require('../../controllers/api/faculty')
router.get('/', faculty.get)
// router.post('/', faculty.create)
// router.get('/:uuid', faculty.find)
// router.patch('/:uuid', faculty.update)
// router.delete('/:uuid', faculty.delete)
  
module.exports = router;