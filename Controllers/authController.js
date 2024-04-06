const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;
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

    // bikinin token setelah pengguna terdaftar
    const token = jwt.sign({ id_pengguna: pengguna.id_pengguna, email: pengguna.email }, 'secret_key', { expiresIn: '1h' });
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    res.status(201).send({ message: "User registered successfully", pengguna, token });
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

    res.status(200).send({ message: "Login successful", pengguna, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProfile = async (req, res) => {

  console.log(req.body, req.pengguna);

  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;

    // Pastikan ID pengguna yang ingin diperbarui sesuai dengan ID pengguna yang telah diotentikasi
    if (req.pengguna.id_pengguna !== req.body.id_pengguna) {
      return res.status(403).send({ message: "Forbidden: Unauthorized update" });
    }

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
        ...(hashedPassword && { password: hashedPassword }), // Hanya update password jika ada
      },
      { where: { id_pengguna: req.pengguna.id_pengguna } }
    );

    if (updatedPengguna[0] === 0) {
      return res.status(404).send({ message: "User not found or no changes applied" });
    }

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};







