const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;
    
    // Periksa apakah email sudah terdaftar
    const existingUser = await Pengguna.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email sudah terdaftar. Silakan gunakan email lain." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const pengguna = await Pengguna.create({
      nama,
      nomor_telp,
      nomor_polisi,
      detail_kendaraan,
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).send({ message: "User registered successfully", pengguna });
  } catch (error) {
    res.status(500).send(error.message);
  }   
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).send({ message: "Username or email is required" });
    }

    const whereCondition = {};
    if (username) {
      whereCondition[Sequelize.Op.or] = [{ username: username }];
    } else {
      whereCondition[Sequelize.Op.or] = [{ email: email }];
    }

    const pengguna = await Pengguna.findOne({
      where: whereCondition
    }).catch(error => {
      return res.status(500).send({ message: "Internal server error", error: error.message });
    });

    if (!pengguna) {
      return res.status(404).send({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, pengguna.password);
    if (!match) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id_pengguna: pengguna.id_pengguna, email: pengguna.email }, 'secret_key', { expiresIn: '1h' });
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

    res.status(200)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;
    const userId = req.pengguna.id_pengguna;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update informasi profil pengguna
    const updatedPengguna = await Pengguna.update(
      {
        nama,
        nomor_telp,
        nomor_polisi,
        detail_kendaraan,
        email,
        username,
        ...(hashedPassword && { password: hashedPassword }), 
      },
      { where: { id_pengguna: userId } } 
    );

    if (updatedPengguna[0] === 0) {
      return res.status(404).send({ message: "User not found or no changes applied" });
    }

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
