const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Unauthorized: No token provided" });
    }

    const token = tokenHeader.split(' ')[1];
    console.log("Received Token:", token); 

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            console.log("Token Verification Error:", err.message); 
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }

        req.pengguna = decoded;
        next();
    });
};


module.exports = { authenticateToken };
