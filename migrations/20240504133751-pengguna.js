'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengguna', {
      id_pengguna: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomor_telp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomor_polisi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      detail_kendaraan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tokenResetPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengguna');
  }
};
