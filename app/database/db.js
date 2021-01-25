const mysql = require('mysql2/promise');
const dotenv=require('dotenv');
dotenv.config();
// Create Connection to the databasee
 const db = mysql.createPool(
   {
  
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  queueLimit: process.env.queueLimit,

}
 //process.env.CLEARDB_DATABASE_URL
);
//console.log(db)
if(db.state === 'disconnected'){
    console.log('Server Down')
}else{
    console.log('Connected to database') 
}
const connection = db;

module.exports = connection;