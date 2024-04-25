const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost:3306/parkingmonitoring")


const Parkiran = sequelize.define('parkiran', {
    blok_parkir: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    lantai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kendaraan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'unavailable'), 
      allowNull: false,
      defaultValue: 'available'
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
module.exports = Parkiran;

