const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;

    if (!nama || !nomor_telp || !nomor_polisi || !detail_kendaraan || !email || !username || !password) {
      console.log('Field kosong ditemukan');
      return res.status(400).send({ message: 'Semua field harus diisi.' });
    }
    
    // Periksa apakah email sudah terdaftar
    const existingUser = await Pengguna.findOne({ where: { email } });
    if (existingUser) {
      console.log(`Email sudah terdaftar: ${email}`);
      return res.status(400).send({ message: 'Email sudah terdaftar. Silakan gunakan email lain.' });
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

    res.status(201).send({ message: 'Pengguna berhasil terdaftar', pengguna });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).send({ message: "Diperlukan nama pengguna atau email" });
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
      return res.status(500).send({ message: "Server sedang gangguan", error: error.message });
    });

    if (!pengguna) {
      return res.status(404).send({ message: "Pengguna tidak di temukan" });
    }

    const match = await bcrypt.compare(password, pengguna.password);
    if (!match) {
      return res.status(401).send({ message: "Kata sandi salah" });
    }

    const token = jwt.sign({ email: pengguna.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    res.status(200).send({ message: "Login berhasil", pengguna, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getDataUser = async (req, res) => {
  const emailPengguna = req.pengguna.email;

  try {
    const pengguna = await Pengguna.findByPk(emailPengguna);

    if (!pengguna) {
      return res.status(404).json({ error: 'Data pengguna tidak ditemukan.' });
    }

    res.status(200).json({ pengguna });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username } = req.body;
    const emailPengguna = req.pengguna.email;

    // Objek untuk mengupdate data pengguna
    const updatedData = {
      nama,
      nomor_telp,
      nomor_polisi,
      detail_kendaraan,
      email,
      username,
    };

    // Update informasi profil pengguna
    const updatedPengguna = await Pengguna.update(
      updatedData,
      { where: { email: emailPengguna } } 
    );

    if (updatedPengguna[0] === 0) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan" });
    }

    res.status(200).send({ message: "Profil berhasil di ubah" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = async (req, res) => {

  res.clearCookie('token'); 
  res.status(200).json({ message: 'Logout berhasil' });
  
};