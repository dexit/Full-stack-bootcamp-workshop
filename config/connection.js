const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  

  DB_NAME='library_db',
  DB_USER='root',
  DB_PASSWORD='5956272!Kk',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
