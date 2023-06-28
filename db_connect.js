var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "database1.c4sxoawklo3k.ap-southeast-1.rds.amazonaws.com",
  user     : "thrisha",
  password : "Sairam1312",
  port     : 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();