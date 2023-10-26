const router = require('express').Router();
const userControllers = require('../controllers/user.controllers');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/authenticate', userControllers.authenticate);

module.exports = router;