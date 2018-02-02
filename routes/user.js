const database = require('./mysql');
var express = require('express');
var router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('./config');

router.get('/', function(req, res){
	res.send('User');
});

router.post('/register', function(req, res){
	validateRegister(req.body.name, req.body.email, req.body.password, req.body.reg_no)
	.then(function(){
		return generateHash(req.body.password)
	})
	.then(function(hash){
		return database.addUser(req.body.name, req.body.email, hash, req.body.reg_no);
	})
	.then(function(){
		res.json({
			'success': 'true'
		})
	})
	.catch(function(err){
		res.json({
			'success': 'false',
			'error': err
		})
	});
});

router.post('/login', function(req, res){
	validateLogin(req.body.email, req.body.password)
	.then(function(){
		return database.getPassword(req.body.email)
	})
	.then(function(hash){
		return matchPassword(req.body.password, hash);
	})
	.then(function(){
		return generateSession(req.body.email);
	})
	.then(function(token){
		return database.recordToken(req.body.email, token);
	})
	.then(function(token){
		res.json({
			'success': 'true',
			'token': token
		})
	})
	.catch(function(err){
		res.json({
			'success': 'false',
			'error': err
		})
	});
});

function generateHash(text){
	return new Promise(function(resolve){
		bcrypt.genSalt(saltRounds, function(err, salt) {
		    bcrypt.hash(text, salt, function(err, hash) {
		        resolve(hash)
		    });
		});
	});
}

function matchPassword(password, hash){
	return new Promise(function(resolve, reject){
		bcrypt.compare(password, hash, function(err, res){
			if(err){
				return reject(err);
			}else if(!res){
				return reject('wrong password');
			}else{
				return resolve(res)
			}
		});
	});
}

function generateSession(email){
	return new Promise(function(resolve, reject){
		const payload = {user: email};
	    jwt.sign(payload, config.SESSION_TOKEN_SECRET, function(err, token){
	    	if(err){
				return reject('session token could not be generated');
			}else{
				return resolve(token);
			}
		});
	});
}

function validateLogin(email, password){
	return new Promise(function(resolve, reject){
		if(email && password){
			resolve();
		}else{
			reject('incomplete form data');
		}
	});
}

function validateRegister(name, email, password, reg_no){
	return new Promise(function(resolve, reject){
		if(email && password && password && reg_no){
			resolve();
		}else{
			reject('incomplete form data');
		}
	});
}

module.exports = router;