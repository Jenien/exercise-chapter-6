const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUser: async (email, password) => {
        return prisma.user.create({
            data: {
                email,
                password,
            }
        });
    },
    getUserByEmail: async (email) => {
        return prisma.user.findUnique({
            where: {
                email,
            }
        });
    }
}
