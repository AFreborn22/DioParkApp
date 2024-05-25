'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkiranrealtime', {
      id_parkir: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pengguna: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pengguna', 
          key: 'id_pengguna',
        },
      },
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'parkiran', 
          key: 'blok_parkir',
        },
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'transaksi_parkir', 
          key: 'id_transaksi',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkiranrealtime');
  }
};