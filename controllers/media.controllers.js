const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    authenticate: async (req, res) => {
        try {
            const { first_name, last_name, birth_date } = req.body;
            const profile_picture = req.file;


            const user = await prisma.user.create({
                data: {
                    email: req.user.email, 
                    password: 'isi' 
                }
            });

            const userProfile = await prisma.userProfile.create({
                data: {
                    userId: user.id,
                    firstName: first_name,
                    lastName: last_name,
                    birthDate: birth_date,
                    profilePicture: profile_picture.path 
                }
            });

            return res.json({
                status: true,
                message: 'Authentication successful',
                data: {
                    first_name: userProfile.firstName,
                    last_name: userProfile.lastName,
                    email: user.email,
                    birth_date: userProfile.birthDate,
                    profile_picture: userProfile.profilePicture
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error during authentication',
                error: error.message
            });
        }
    }
}
