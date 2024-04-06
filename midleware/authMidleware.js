const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization; 
    if (!token) {
        console.log("Token not found");
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            console.log("Invalid token:", err.message);
            return res.status(403).send({ message: "Invalid token" });
        }
        req.pengguna = decoded; 
        console.log("Token verified:", decoded); 
        
        const idPengguna = decoded.id_pengguna;
        if (!idPengguna) {
            console.log("User ID not found in token");
            return res.status(403).send({ message: "User ID not found in token" });
        }

        next();
    });
};

module.exports = { authenticateToken };
