const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//   host: 'localhost',
//   user: 'john',
//   password: 'Password1@',
//   database: 'osf898i7seo88lnz',
// });

const connection = mysql.createPool({
  host: 'kfgk8u2ogtoylkq9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'lfb5fx7xngfxmx2k',
  password: 'ecmsdack3fbbycvf',
  database: 'b3hmn9p6pdkccpij',
})

module.exports = connection;
