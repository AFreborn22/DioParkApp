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
    database: 'parkingmonitoring',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'MYSQL_URL',
    dialect: 'mysql',
  }
};