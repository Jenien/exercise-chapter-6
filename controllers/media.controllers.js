const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    authenticate: async (req, res) => {
        try {
            const { first_name, last_name, birth_date } = req.body;
            const profile_picture = req.file;

            // Simpan data di database
            const user = await prisma.user.create({
                data: {
                    email: req.user.email, // Anda perlu mengganti ini dengan cara Anda mendapatkan email pengguna yang telah terautentikasi
                    password: 'dummy_password' // Ganti dengan cara Anda menyimpan kata sandi atau token otentikasi
                }
            });

            const userProfile = await prisma.userProfile.create({
                data: {
                    userId: user.id,
                    firstName: first_name,
                    lastName: last_name,
                    birthDate: birth_date,
                    profilePicture: profile_picture.path // Anda perlu menyesuaikan dengan cara Anda menyimpan gambar profil
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
