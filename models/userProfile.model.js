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
    updateUserProfile: async (userId, firstName, lastName, birthDate, profilePicture) => {
        return prisma.userProfile.update({
            where: {
                userId,
            },
            data: {
                firstName,
                lastName,
                birthDate,
                profilePicture,
            }
        });
    },
    getUserProfileByUserId: async (userId) => {
        return prisma.userProfile.findUnique({
            where: {
                userId,
            }
        });
    }
}
