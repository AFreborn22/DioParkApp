const { sequelize } = require('../src/Models');
const Parkiranrealtime = require('../src/Models/parkiranrealtime');
const Transaksi = require('../src/Models/transaksi');
const Pengguna = require('../src/Models/pengguna');
const Parkiran = require('../src/Models/parkiran');

const createTestData = async () => {
    const transaction = await sequelize.transaction();
    try {
      const pengguna = await Pengguna.create({
        nama: 'John Doe',
        nomor_telp: '081234567890',
        nomor_polisi: 'AB123CD',
        detail_kendaraan: 'Motor',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123'
      }, { transaction });
  
      const parkiran = await Parkiran.create({
        blok_parkir: 'A1',
        lantai: 1,
        kendaraan: 'motor',
        status: 'available'
      }, { transaction });
  
      const transaksi = await Transaksi.create({
        id_pengguna: pengguna.id_pengguna,
        status: 'masuk',
        blok_parkir: 'A1'
      }, { transaction });
  
      const parkiranrealtime = await Parkiranrealtime.create({
        id_pengguna: pengguna.id_pengguna,
        blok_parkir: 'A1',
        id_transaksi: transaksi.id_transaksi
      }, { transaction });
  
      // Commit transaksi
      await transaction.commit();
  
      return { pengguna, parkiran, transaksi, parkiranrealtime };
    } catch (error) {
      // Rollback transaksi jika terjadi kesalahan
      await transaction.rollback();
      console.error('Error during test data setup:', error);
      throw error;
    }
  };
  
  module.exports = createTestData;  