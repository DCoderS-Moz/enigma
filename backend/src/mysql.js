const bcrypt = require('bcrypt');
var mysql = require('mysql');

var conn = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_USER_PASS,
	database: process.env.DB_NAME
});

function disconnect(){
	conn.end(function(err) {
		if(err){
			console.log({
				success: false,
				error_type: 'Mysql disconnect error',
				error: err.sqlMessage
			});	
		}
	});
}


exports.addUser = function(name, email, password, callback){
	conn.connect(function(err) {
		if(err){
			return callback({
				success: false,
				error: err.sqlMessage
			});	
		}else{
			var sql = "INSERT INTO users (name, email, password) VALUES ('" + name + "', '" + email + "', '" + password + "')";
			conn.query(sql, function(err, result) {
				if(err){
					return callback({
						success: false,
						error: err.sqlMessage
					});	
				}else{
					return callback({
						success: true
					});	
				}
			});
			disconnect();
		}
	});
};