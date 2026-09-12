// config/db.js
const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server:   process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('🗄️  Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('❌ Database Connection Failed!', err));

module.exports = {
  sql, poolPromise
};
