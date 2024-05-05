require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME_PRO,
    password: process.env.DB_PASSWORD_PRO,
    database: process.env.DB_NAME_PRO,
    host: process.env.DB_HOST_PRO,
    port: 10257,
    dialect: 'mysql'
  }
};