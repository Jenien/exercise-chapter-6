const userProfileModel = require('../models/userProfile.model');

module.exports = {
    updateProfile: async (req, res) => {
        try {
            const { userId } = req.user; // Dapatkan ID pengguna dari autentikasi

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
}
