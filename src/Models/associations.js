const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)
const Pengguna = require('./pengguna');
const Parkiran = require('./parkiran');
const Transaksi = require('./transaksi');
const Parkiranrealtime = require('./parkiranrealtime');

Transaksi.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Transaksi, { foreignKey: 'id_pengguna' });

Transaksi.belongsTo(Parkiran, { foreignKey: 'blok_parkir' });
Parkiran.hasMany(Transaksi, { foreignKey: 'blok_parkir' });

Parkiranrealtime.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Parkiranrealtime, { foreignKey: 'id_pengguna' });

Parkiranrealtime.belongsTo(Parkiran, { foreignKey: 'blok_parkir' });
Parkiran.hasMany(Parkiranrealtime, { foreignKey: 'blok_parkir' });

Parkiranrealtime.belongsTo(Transaksi, { foreignKey: 'id_transaksi' });
Transaksi.hasMany(Parkiranrealtime, { foreignKey: 'id_transaksi' });

module.exports = {
  sequelize,
  Pengguna,
  Parkiran,
  Transaksi,
  Parkiranrealtime,
};