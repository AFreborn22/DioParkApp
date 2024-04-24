const jwt = require('jsonwebtoken');
const Admin = require('../Models/admin');

exports.checkAdminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, 'secret_key');
        const admin = await Admin.findByPk(decoded.username);

        if (!admin) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};