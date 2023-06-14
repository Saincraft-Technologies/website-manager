const dbConfig = require("./config")();
const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
});
// connection.query(
//   `DROP DATABASE IF EXISTS employee_tracker247_db`,
//   function (err, results) {
//     // console.log('error............>', results);
//     // console.log(err);
//   }
// );
// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS ` + dbConfig.DB_NAME,
  function (err, results) {
    // console.log('error............>', results);
    console.log(err);
  }
);

// Close the connection
// console.log(dbConfig);
const sequelize = new Sequelize('storekeeper_utilities_db', dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    timezone: '+03:00',
  },
  logging: false
});

const Op = Sequelize.Op;
connection.end();

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };
