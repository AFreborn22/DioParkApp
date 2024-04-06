const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost:3306/parkingmonitoring")

const Pengguna = sequelize.define('pengguna', {
    id_pengguna: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomor_telp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomor_polisi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    detail_kendaraan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = Pengguna;

