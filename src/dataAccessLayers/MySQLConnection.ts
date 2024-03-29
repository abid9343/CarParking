const util = require('util');
const mysql = require('mysql');
const configuration = require('../jsons/config/configuration.json')['local_db'];
const pool = mysql.createPool(configuration);

//connectionLimit: 10,
// Ping database to check for common exception errors.
pool.getConnection((err: any, connection: any) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();

  return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
