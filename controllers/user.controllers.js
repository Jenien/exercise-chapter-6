const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await userModel.createUser(email, hashedPassword);

            return res.json({
                status: true,
                message: 'User registered successfully',
                data: { user }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error registering user',
                error: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid credentials'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({
                status: true,
                message: 'Login successful',
                data: { user, token }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error during login',
                error: error.message
            });
        }
    },

    authenticate: async (req, res) => {
        try {
            // Dapatkan informasi pengguna dari token JWT
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Dapatkan pengguna berdasarkan ID yang diambil dari token
            const user = await userModel.getUserById(decodedToken.userId);

            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: 'User not found'
                });
            }

            return res.json({
                status: true,
                message: 'Authentication successful',
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    birth_date: user.birth_date,
                    profile_picture: user.profile_picture
                }
            });
        } catch (error) {
            return res.status(401).json({
                status: false,
                message: 'Invalid token'
            });
        }
    }
}
