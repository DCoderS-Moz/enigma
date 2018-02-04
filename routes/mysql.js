var mysql = require('mysql');
const config = require('./config.js');

var conn = mysql.createConnection({
	host: 'localhost',
	user: config.DB_USER,
	password: config.DB_USER_PASS,
	database: config.DB_NAME
});

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

exports.removeToken = function(email){
	return new Promise(function(resolve, reject){
		var sql = "UPDATE users SET token='' WHERE email='" + email +"'";
		conn.query(sql, function(err){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve();
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
			}else if(!result[0]){
				reject('wrong password')
			}else{
				resolve(result[0].password);
			}
		});
	});
}

exports.getLastQuestion = function(email){
	return new Promise(function(resolve, reject){
		var sql = "SELECT last_question from users WHERE email='" + email + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve(result[0].last_question);
			}
		});
	});
}

exports.getQuestionDetails = function(question_no){
	return new Promise(function(resolve, reject){
		var sql = "SELECT question, option1, option2, option3, option4 from questions WHERE id='" + question_no + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				result[0]['questionNo'] = question_no;
				resolve(result[0]);
			}
		});
	});
}

exports.getCorrectAnswer = function(question_no){
	return new Promise(function(resolve, reject){
		var sql = "SELECT correct_answer from questions WHERE id='" + question_no + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve(result[0].correct_answer);
			}
		});
	});
}

exports.incrementScore = function(email){
	return new Promise(function(resolve, reject){
		var sql = "UPDATE users SET score=score+1 WHERE email='" + email + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve();
			}
		});
	});
}

exports.incrementLastQuestion = function(email){
	return new Promise(function(resolve, reject){
		var sql = "UPDATE users SET last_question=last_question+1 WHERE email='" + email + "'";
		conn.query(sql, function(err, result){
			if(err){
				reject(err.sqlMessage);
			}else{
				resolve();
			}
		});
	});
}