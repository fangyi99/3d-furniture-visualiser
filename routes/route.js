const router = require('express').Router();
controller = require('../controllers/controller');

router.get('/', controller.main);
router.get('/listings', controller.listings);
router.get('/details', controller.details);

module.exports = router;