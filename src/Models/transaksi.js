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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Pengguna,
            key: 'email',
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

Pengguna.hasMany(Transaksi, { foreignKey: 'email', onDelete: 'CASCADE' });
Transaksi.belongsTo(Pengguna, { foreignKey: 'email' });

Parkiran.hasMany(Transaksi, { foreignKey: 'blok_parkir', onDelete: 'CASCADE' });
Transaksi.belongsTo(Parkiran, { foreignKey: 'blok_parkir' });

module.exports = Transaksi;