const userProfileModel = require('../models/userProfile.model');
const jwt = require('jsonwebtoken');

module.exports = {
    createUserProfile: async (req, res) => {
        try {
            const { userId } = req.user;
            const { first_name, last_name, birth_date } = req.body;
            const profile_picture = req.file;

            const createdProfile = await userProfileModel.createUserProfile(userId, first_name, last_name, birth_date, profile_picture);

            return res.json({
                status: true,
                message: 'UserProfile created successfully',
                data: { createdProfile }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error creating userProfile',
                error: error.message
            });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

            const { first_name, last_name, birth_date } = req.body;
            const profile_picture = req.file;

            const updatedProfile = await userProfileModel.updateUserProfile(userId, first_name, last_name, birth_date, profile_picture);

            return res.json({
                status: true,
                message: 'Profile updated successfully',
                data: { updatedProfile }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error updating profile',
                error: error.message
            });
        }
    },
};
