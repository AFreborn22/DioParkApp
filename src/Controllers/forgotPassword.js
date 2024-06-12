const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const { transporter } = require('../helpers/transporter');

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const pengguna = await Pengguna.findByPk(email);
  
      if (!pengguna) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
  
      // buatin token buat reset password
      const token = jwt.sign({ email: pengguna.email }, 'your_secret_key', { expiresIn: '1h' });
  
      //simpen token nya ke db
      pengguna.tokenResetPassword = token;
      await pengguna.save();
  
      // kirim email nya
      await transporter.sendMail({
        from: 'dioparkApp',
        to: email,
        subject: 'Reset Password account dioparkApp ',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333;">Diopark App</h1>
            <p style="font-size: 16px;">Anda telah meminta pengaturan ulang kata sandi. Klik tombol di bawah ini untuk mengatur ulang kata sandi Anda:</p>
            <a href="${process.env.CLIENT_URL}/updatepassword?token=${token}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Reset Password</a>
            <p style="font-size: 12px; color: #777; margin-top: 20px;">Jika Anda tidak meminta hal ini, Anda dapat mengabaikan email ini.</p>
        </div>
      `,
      });
  
      return res.status(200).json({ message: 'Tautan reset sudah dikirim ke email Anda' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server sedang gangguan' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
      const { password } = req.body;
      const token = req.query.token;
      
      const decodedToken = jwt.verify(token, 'secret_key');
  
      const pengguna = await Pengguna.findByPk(decodedToken.email);
  
      if (!pengguna) {
        return res.status(404).json({ error: 'Pengguna tidak di temukan' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      //ubah password nya
      pengguna.password = hashedPassword;
      pengguna.tokenResetPassword = null;
      await pengguna.save();
  
      return res.status(200).json({ message: 'Berhasil mengatur ulang kata sandi' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server sedang gangguan' });
    }
  };