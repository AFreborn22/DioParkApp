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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model : 'Pengguna',
        key : 'id_pengguna',
      },
    },
    waktu_parkir: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Transaksi.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
  Pengguna.hasMany(Transaksi, { foreignKey: 'id_pengguna' });
  
module.exports = Transaksi;

