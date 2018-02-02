var mysql = require('mysql');
const config = require('./config.js');
const saltRounds = 10;
const bcrypt = require('bcrypt');

var conn = mysql.createConnection({
	host: 'localhost',
	user: config.DB_USER,
	password: config.DB_USER_PASS,
	database: config.DB_NAME
});

function generateHash(text){
	return new Promise(function(resolve, reject){
		bcrypt.genSalt(saltRounds, function(err, salt) {
		    bcrypt.hash(text, salt, function(err, hash) {
		        resolve(hash)
		    });
		});
	});
}

conn.connect(function(err) {
	if(err){
		console.log('Could not conenct to database : ' + err);
	}else{
		console.log('Connected to database!');
	}
});

exports.addUser = function(name, email, password, reg_no){
	return new Promise(function(resolve, reject){
		var sql = "INSERT INTO users (name, email, password, reg_no) VALUES ('" + name + "', '" + email + "', '" + password + "', '" + reg_no + "')";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve();
			}
		});
	});
}

exports.recordToken = function(email, token){
	return new Promise(function(resolve, reject){
		var sql = "UPDATE users SET token='" + token + "' WHERE email='" + email +"'";
		conn.query(sql, function(err){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve(token);
			}
		});
	});
}

exports.getPassword = function(email){
	return new Promise(function(resolve, reject){
		var sql = "SELECT password from users WHERE email='" + email + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve(result[0].password);
			}
		});
	});
}