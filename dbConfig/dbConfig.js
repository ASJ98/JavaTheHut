const mysql = require("mysql");
let pool; // 


function initializeDatabaseConnection() {
  if (!pool) {
    const config = {
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };
    pool = mysql.createPool(config);
  }
  return pool;
}

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}




module.exports = {
  queryDatabase,
  initializeDatabaseConnection,

};
