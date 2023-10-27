const router = require('express').Router();
const userProfileControllers = require('../controllers/userProfile.controllers');
const { imageStorage } = require('../libs/multer');
const authenticateToken = require('../middleware/auth');

router.post('/updateProfile', authenticateToken, imageStorage.single('profile_picture'), userProfileControllers.updateProfile);
router.post('/createProfile', authenticateToken, imageStorage.single('profile_picture'), userProfileControllers.createUserProfile);
router.post('/createUserProfile', authenticateToken, imageStorage.single('profile_picture'), userProfileControllers.createUserProfile);

module.exports = router;
