const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (!err){
        console.log("Database is connected");
    }
    else{
        console.log("Error while connecting with database", err);
    }
});

module.exports = connection;