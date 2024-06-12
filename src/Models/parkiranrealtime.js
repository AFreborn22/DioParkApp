const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Pengguna = require('./pengguna');
const Parkiran = require('./parkiran');
const Transaksi = require('./transaksi');


const Pakiranrealtime = sequelize.define('parkiranrealtime', {
    id_parkir: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model : Pengguna,
        key : 'email',
      },
    },
    blok_parkir: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model : Parkiran,
        key : 'blok_parkir',
      },
    },
    id_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model : Transaksi,
        key : 'id_transaksi',
      },
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Pakiranrealtime.belongsTo(Pengguna, { foreignKey: 'email', onDelete: 'CASCADE' });
  Pengguna.hasMany(Pakiranrealtime, { foreignKey: 'email' });
  
  Pakiranrealtime.belongsTo(Parkiran, { foreignKey: 'blok_parkir', onDelete: 'CASCADE' });
  Parkiran.hasMany(Pakiranrealtime, { foreignKey: 'blok_parkir' });
  
  Pakiranrealtime.belongsTo(Transaksi, { foreignKey: 'id_transaksi', onDelete: 'CASCADE' });
  Transaksi.hasMany(Pakiranrealtime, { foreignKey: 'id_transaksi' });
  
module.exports = Pakiranrealtime;
