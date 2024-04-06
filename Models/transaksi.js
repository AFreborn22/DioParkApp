const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost:3306/parkingmonitoring")

const Pengguna = require('./pengguna');

const Transaksi = sequelize.define('transaksi_parkir', {
    id_transaksi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pengguna: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model : 'Pengguna',
        key : 'id_pengguna',
      },
    },
    waktu_masuk: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    waktu_keluar: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOL,
        allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  Transaksi.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
  Pengguna.hasMany(Transaksi, { foreignKey: 'id_pengguna' });
  
module.exports = Transaksi;

