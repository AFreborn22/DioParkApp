const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL);

const Pengguna = require('./pengguna');
const Parkiran = require('./parkiran');

const Transaksi = sequelize.define('transaksi_parkir', {
    id_transaksi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_pengguna: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pengguna,
            key: 'id_pengguna',
        },
    },
    waktu_parkir: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blok_parkir: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Parkiran,
            key: 'blok_parkir',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

Pengguna.hasMany(Transaksi, { foreignKey: 'id_pengguna' });
Transaksi.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });

Parkiran.hasMany(Transaksi, { foreignKey: 'blok_parkir' });
Transaksi.belongsTo(Parkiran, { foreignKey: 'blok_parkir' });

module.exports = Transaksi;