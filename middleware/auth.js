const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Access denied'
        });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: false,
                message: 'Invalid token'
            });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticate;