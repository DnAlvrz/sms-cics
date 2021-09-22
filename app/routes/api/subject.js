const router = require('express').Router();
const subject = require('../../controllers/api/subject');

router.get('/', subject.get);
// router.post('/', subject.create);
// router.get('/:uuid', subject.find);
// router.patch('/:uuid', subject.update);
// router.delete('/:uuid', subject.delete);

module.exports = router;