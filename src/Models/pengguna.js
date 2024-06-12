const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Pengguna = sequelize.define('pengguna', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tokenResetPassword: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = Pengguna;

