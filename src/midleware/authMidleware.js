const jwt = require('jsonwebtoken');
const Pengguna = require('../Models/pengguna');

exports.authenticateToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        console.log("Received Token:", token); 

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const pengguna = await Pengguna.findByPk(decoded.email);

        if (!pengguna) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.pengguna = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message); 
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
