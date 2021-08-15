require('dotenv').config();
const mysql = require('mysql2/promise');

console.log(process.env.HOST)

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = connection;
