'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkiranrealtime', {
      id_parkir: {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'parkiran', 
          key: 'blok_parkir',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'transaksi_parkir', 
          key: 'id_transaksi',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkiranrealtime');
  }
};