const router = require('express').Router();
const userProfileControllers = require('../controllers/userProfile.controllers');
const { imageStorage } = require('../libs/multer');

router.post('/update-profile', imageStorage.single('profile_picture'), userProfileControllers.updateProfile);

module.exports = router;