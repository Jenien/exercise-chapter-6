const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUserProfile: async (userId, firstName, lastName, birthDate, profilePicture) => {
        return prisma.userProfile.create({
            data: {
                userId,
                firstName,
                lastName,
                birthDate,
                profilePicture,
            }
        });
    },
    updateProfile: async (req, res) => {
        try {
            const { userId } = req.user; 

            const { first_name, last_name, birth_date } = req.body;
            const profile_picture = req.file;

            const updatedProfile = await userProfileModel.updateUserProfile(userId, first_name, last_name, birth_date, profile_picture);

            console.log('updatedProfile:', updatedProfile); 

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
        getUserProfileByUserId: async (userId) => {
        return prisma.userProfile.findUnique({
            where: {
                userId,
            }
        });
    }
}
