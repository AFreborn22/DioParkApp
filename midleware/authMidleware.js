const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    let token = req.headers.authorization || req.cookies.token;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Unauthorized: No token provided" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    console.log("Received Token:", token); 

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Token Verification Error:", err.message); 
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }

        req.pengguna = decoded;
        next();
    });
};

module.exports = { authenticateToken };
