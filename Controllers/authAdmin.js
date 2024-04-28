const jwt = require('jsonwebtoken');
const Admin = require('../Models/admin');

exports.adminLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findByPk(username);
  
      if (!admin || !password) {
        return res.status(401).send({ message: "username atau password salah" });
      }
  
      const token = jwt.sign({ username: admin.username, role: 'admin' }, 'secret_key', { expiresIn: '1h' });

      res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
  
      res.status(200).send({ message: "Admin logged in successfully", token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};