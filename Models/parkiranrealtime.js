const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost:3306/parkingmonitoring")

const Pengguna = require('./pengguna');
const Parkiran = require('./parkiran');
const Transaksi = require('./transaksi');


const Pakiranrealtime = sequelize.define('parkiranrealtime', {
    id_parkir: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pengguna: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model : 'pengguna',
        key : 'id_pengguna',
      },
    },
    blok_parkir: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model : 'parkiran',
        key : 'blok_parkir',
      },
    },
    id_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model : 'transaksi',
        key : 'id_transaksi',
      },
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Pakiranrealtime.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
  Pengguna.hasMany(Pakiranrealtime, { foreignKey: 'id_pengguna' });
  Pakiranrealtime.belongsTo(Parkiran, { foreignKey: 'blok_parkir' });
  Parkiran.hasMany(Pakiranrealtime, { foreignKey: 'blok_parkir' });
  Pakiranrealtime.belongsTo(Transaksi, { foreignKey: 'id_transaksi' }); // Perbaikan disini
  Transaksi.hasMany(Pakiranrealtime, { foreignKey: 'id_transaksi' }); // Perbaikan disini
  
module.exports = Pakiranrealtime;
