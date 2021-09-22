const router = require('express').Router();
const schoolyear = require('../../controllers/api/schoolyear')
router.get('/', schoolyear.get)
// router.post('/', schoolyear.create)
// router.get('/:uuid', schoolyear.find)
// router.patch('/:uuid', schoolyear.update)
// router.delete('/:uuid', schoolyear.delete)

module.exports = router;