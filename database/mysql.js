const dbConfig = require("../database/config")();
const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql = require("mysql2");

const app = require('../applications/app');

// Run create database statement

try {
  console.log('here i am and action is ', process.env.DB_ACTION)
  switch (process.env.DB_ACTION) {
    case 'delete':
      var connection = mysql.createConnection({
        host: dbConfig.DB_HOST || '127.0.0.1',
        port: dbConfig.DB_PORT || 3307,
        user: dbConfig.DB_USER || 'root',
        password: dbConfig.DB_PASSWORD || 'thina2023'
      });

      connection.query(
        `DROP DATABASE IF EXISTS ${dbConfig.DB_NAME}`,
        function (err, results) {
          console.log('error............>', results);
          console.log(err);
        }
      );
      break;
    case 'create':
      var connection = mysql.createConnection({
        host: dbConfig.DB_HOST || '127.0.0.1',
        port: dbConfig.DB_PORT || 3307,
        user: dbConfig.DB_USER || 'root',
        password: dbConfig.DB_PASSWORD || 'thina2023'
      });
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB_NAME}`,
        function (err, results) {
          console.log('error............>', results);
          console.log(err);
        }
      );
      break;
    default:
      if (connection) {
        connection.destroy();
      }
      break;
  }

  var sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
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
  // connection.end();

  module.exports = { Sequelize, sequelize, DataTypes, Op, Model };
} catch (err) {
  console.log(err);
  throw err;
}



