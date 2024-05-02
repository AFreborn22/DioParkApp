const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const { transporter } = require('../helpers/transporter');

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const pengguna = await Pengguna.findOne({ where: { email } });
  
      if (!pengguna) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // buatin token buat reset password
      const resetToken = jwt.sign({ userId: pengguna.id_pengguna }, 'your_secret_key', { expiresIn: '1h' });
  
      // Save the reset token to the user in the database
      pengguna.tokenResetPassword = resetToken;
      await pengguna.save();
  
      // Send the reset email
      await transporter.sendMail({
        from: 'dioparkApp',
        to: email,
        subject: 'Reset Password',
        html: `
        <h1>Diopark App</h1>
        Click <a href="${process.env.CLIENT_URL}/api/password/reset-password${resetToken}">here</a> to reset your password.`,
      });
  
      return res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      // Verify and decode the reset token (JWT)
      const decodedToken = jwt.verify(token, 'your_secret_key');
  
      const pengguna = await Pengguna.findByPk(decodedToken.userId);
  
      if (!pengguna) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Reset the password
      pengguna.password = newPassword;
      pengguna.resetToken = null;
      await pengguna.save();
  
      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };