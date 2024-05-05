const Transaksi = require('../Models/transaksi');
const Parkiran = require('../Models/parkiran');
const Pengguna = require('../Models/pengguna');
const Parkiranrealtime = require('../Models/parkiranrealtime');
const { transporter } = require('../helpers/transporter');

async function scanMasukQRCode(req, res) {
  const { id_pengguna, email } = req.pengguna; 
  const { blok_parkir } = req.body; 

  try {
    // Cari data parkiran sesuai dengan blok_parkir dari QR code
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'available' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak tersedia atau QR code tidak valid' });
    }

    await Parkiran.update({ status: 'unavailable' }, { where: { blok_parkir } });
    const pengguna = await Pengguna.findByPk(id_pengguna);

    if (!pengguna) {
      return res.status(404).json({ error: 'Informasi pengguna tidak ditemukan' });
    }

    // Buat transaksi masuk
    const waktu_parkir = new Date().toLocaleString(); 
    const status = 'masuk';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status, blok_parkir });
    const parkiranrealtime = await Parkiranrealtime.create({ id_pengguna, blok_parkir, id_transaksi: transaksi.id_transaksi });

    await transporter.sendMail({
      from: 'dioparkApp',
      to: email,
      subject: 'Diopark App - Invoice Scan In',
      html:  `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: 0 auto;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              }
              h1 {
                  color: #333;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              p {
                  font-size: 16px;
                  margin-bottom: 10px;
              }
              .footer {
                  font-size: 12px;
                  color: #777;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div>
              <h1>Invoice Scan In Diopark</h1>
              <p><strong>Nama:</strong> ${pengguna.nama}</p>
              <p><strong>Nomor Polisi:</strong> ${pengguna.nomor_polisi}</p>
              <p><strong>Detail Kendaraan:</strong> ${pengguna.detail_kendaraan}</p>
              <p><strong>Waktu Parkir:</strong> ${waktu_parkir}</p>
              <p><strong>Status:</strong> ${status}</p>
              <p><strong>Blok parkir:</strong> ${blok_parkir}</p>
          </div>
          <div class="footer">
              <p>Terimakasih dan Selamat jalan</p>
          </div>
      </body>
      </html>  
      `,
    });

    res.status(200).json({ transaksi, parkiranrealtime });
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code masuk:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code masuk' });
  }
}

async function scanKeluarQRCode(req, res) {
  const { id_pengguna, email } = req.pengguna; 
  const { blok_parkir } = req.body; 

  try {
    // Cari data parkiran sesuai dengan blok_parkir dari QR code
    const parkiran = await Parkiran.findOne({ where: { blok_parkir, status: 'unavailable' } });

    if (!parkiran) {
      return res.status(404).json({ error: 'Parkiran tidak tersedia atau QR code tidak valid' });
    }

    await Parkiran.update({ status: 'available' }, { where: { blok_parkir } });
    const pengguna = await Pengguna.findByPk(id_pengguna);

    if (!pengguna) {
      return res.status(404).json({ error: 'Informasi pengguna tidak ditemukan' });
    }

    // Buat transaksi masuk
    const waktu_parkir = new Date().toLocaleString(); 
    const status = 'keluar';
    const transaksi = await Transaksi.create({ id_pengguna, waktu_parkir, status, blok_parkir });
    await Parkiranrealtime.destroy({ where: { id_pengguna, blok_parkir } });

    await transporter.sendMail({
      from: 'dioparkApp',
      to: email,
      subject: 'Diopark App - Invoice Scan out',
      html: `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: 0 auto;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              }
              h1 {
                  color: #333;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              p {
                  font-size: 16px;
                  margin-bottom: 10px;
              }
              .footer {
                  font-size: 12px;
                  color: #777;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div>
              <h1>Invoice Scan In Diopark</h1>
              <p><strong>Nama:</strong> ${pengguna.nama}</p>
              <p><strong>Nomor Polisi:</strong> ${pengguna.nomor_polisi}</p>
              <p><strong>Detail Kendaraan:</strong> ${pengguna.detail_kendaraan}</p>
              <p><strong>Waktu Parkir:</strong> ${waktu_parkir}</p>
              <p><strong>Status:</strong> ${status}</p>
              <p><strong>Blok parkir:</strong> ${blok_parkir}</p>
          </div>
          <div class="footer">
              <p>Terimakasih dan Selamat jalan</p>
          </div>
      </body>
      </html>  
      `,
    });


    res.status(200).json(transaksi);
  } catch (error) {
    console.error('Error saat memproses pemindaian QR code keluar:', error);
    res.status(500).json({ error: 'Gagal memproses pemindaian QR code keluar' });
  }
}

module.exports = { scanMasukQRCode, scanKeluarQRCode };