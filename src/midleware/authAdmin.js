const jwt = require('jsonwebtoken');
const Admin = require('../Models/admin');

exports.checkAdminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    if (token.startsWith('Bearer ')) {

      token = token.slice(7, token.length);
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
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
