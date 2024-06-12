'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi_parkir', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'pengguna', 
          key: 'email',
        },
      },
      waktu_parkir: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'parkiran',
          key: 'blok_parkir',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksi_parkir');
  }
};
