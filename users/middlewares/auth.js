const jwt = require('jsonwebtoken');
require('dotenv').config();

const authUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const authAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authUser,
    authAdmin,
};
