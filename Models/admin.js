const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost:3306/parkingmonitoring")

const Admin = sequelize.define('admin', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  
module.exports = Admin;

