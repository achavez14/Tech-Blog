const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_URL || {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: 'localhost',
    dialect: 'postgres'
  }
);