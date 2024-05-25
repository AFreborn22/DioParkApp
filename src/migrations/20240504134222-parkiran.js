'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkiran', {
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      lantai: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kendaraan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('available', 'unavailable'),
        allowNull: false,
        defaultValue: 'available',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkiran');
  }
};
