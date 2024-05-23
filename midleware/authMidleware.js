const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.token;

    console.log("Authorization Header:", req.headers.authorization); // Log header Authorization
    console.log("Cookies:", req.cookies); // Log cookies

    if (!token) {
        return res.status(401).send({ message: "Unauthorized: No token provided" });
    }

    console.log("Received Token:", token); // Log token yang diterima

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Token Verification Error:", err.message); // Log kesalahan verifikasi token
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }

        req.pengguna = decoded;
        next();
    });
};

module.exports = { authenticateToken };