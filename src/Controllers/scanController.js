const Transaksi = require('../Models/transaksi');
const Parkiran = require('../Models/parkiran');
const Pengguna = require('../Models/pengguna');
const Parkiranrealtime = require('../Models/parkiranrealtime');
const { transporter } = require('../helpers/transporter');
const moment = require('moment-timezone');

async function scanMasukQRCode(req, res) {
  const { email } = req.pengguna; 
  const { blok_parkir } = req.body; 

  try {
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'available' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak tersedia atau QR code tidak valid' });
    }

    await Parkiran.update({ status: 'unavailable' }, { where: { blok_parkir } });
    const pengguna = await Pengguna.findByPk(email);

    if (!pengguna) {
      return res.status(404).json({ error: 'Informasi pengguna tidak ditemukan' });
    }

    // Buat transaksi masuk dengan waktu di zona waktu Asia/Jakarta
    const waktu_parkir = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    const status = 'masuk';
    const transaksi = await Transaksi.create({ email, waktu_parkir, status, blok_parkir });
    const parkiranrealtime = await Parkiranrealtime.create({ email, blok_parkir, id_transaksi: transaksi.id_transaksi });

    await transporter.sendMail({
      from: 'dioparkApp',
      to: email,
      subject: 'Diopark App - Invoice Scan In',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333;">Invoice Scan In Diopark</h1>
          <p style="font-size: 16px;">Nama               : ${pengguna.nama}</p>
          <p style="font-size: 16px;">Nomor Polisi       : ${pengguna.nomor_polisi}</p>
          <p style="font-size: 16px;">Detail Kendaraan   : ${pengguna.detail_kendaraan}</p>
          <p style="font-size: 16px;">Waktu Parkir       : ${waktu_parkir}</p>
          <p style="font-size: 16px;">Status             : ${status}</p>
          <p style="font-size: 16px;">Blok parkir        : ${blok_parkir}</p>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">Jangan Lupa Scan untuk keluar</p>
        </div>
      `,
    });

    res.status(200).json({ transaksi, parkiranrealtime });
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code masuk:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code masuk' });
  }
}

async function scanKeluarQRCode(req, res) {
  const { email } = req.pengguna; 
  const { blok_parkir } = req.body; 

  try {
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'unavailable' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak tersedia atau QR code tidak valid' });
    }

    await Parkiran.update({ status: 'available' }, { where: { blok_parkir } });
    const pengguna = await Pengguna.findByPk(email);

    if (!pengguna) {
      return res.status(404).json({ error: 'Informasi pengguna tidak ditemukan' });
    }

    // Buat transaksi keluar dengan waktu di zona waktu Asia/Jakarta
    const waktu_parkir = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    const status = 'keluar';
    const transaksi = await Transaksi.create({ email, waktu_parkir, status, blok_parkir });
    await Parkiranrealtime.destroy({ where: { email, blok_parkir } });

    await transporter.sendMail({
      from: 'dioparkApp',
      to: email,
      subject: 'Diopark App - Invoice Scan Out',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333;">Invoice Scan Out Diopark</h1>
          <p style="font-size: 16px;">Nama               : ${pengguna.nama}</p>
          <p style="font-size: 16px;">Nomor Polisi       : ${pengguna.nomor_polisi}</p>
          <p style="font-size: 16px;">Detail Kendaraan   : ${pengguna.detail_kendaraan}</p>
          <p style="font-size: 16px;">Waktu Parkir       : ${waktu_parkir}</p>
          <p style="font-size: 16px;">Status             : ${status}</p>
          <p style="font-size: 16px;">Blok parkir        : ${blok_parkir}</p>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">Terimakasih dan Selamat jalan</p>
        </div>
      `,
    });

    res.status(200).json(transaksi);
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code keluar:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code keluar' });
  }
}

module.exports = { scanMasukQRCode, scanKeluarQRCode };