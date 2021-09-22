const router = require('express').Router();
const course = require('../../controllers/api/course');

router.get('/', course.get);
// router.post('/', course.create);
// router.get('/:uuid', course.find);
// router.patch('/:uuid', course.update);
// router.delete('/:uuid', course.delete);
// router.post('/:uuid/addUser', course.addUser);

module.exports = router;