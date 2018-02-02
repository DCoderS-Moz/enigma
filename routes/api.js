var database = require('./mysql');
var router = require('express').Router();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var config = require('./config');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Middleware to check if token passed is legit and to get user email
router.use(function(req, res, next){
	token = req.body.token;
	validateToken(token)
	.then(function(token){
		return verifyToken(token);
	})
	.then(function(user_email){
		req.user_email = user_email;
		next();
	})
	.catch(function(err){
		return res.json({ 
	        success: false, 
	        error: err
	    });
	})

});

router.post('/', function(req,res){
	res.send('YOLO');
});

router.post('/', function(req,res){
	res.send('YOLO');
});


function validateToken(token){
	return new Promise(function(resolve, reject){
		if(token)
			resolve(token);
		else
			reject('invalid token');
	});
}

function verifyToken(token){
	return new Promise(function(resolve, reject){
		jwt.verify(token, config.SESSION_TOKEN_SECRET, function(err, decoded){      
			if (err) {
				return reject('invalid token');
			} else {
				return resolve(decoded.user_email);
			}
		});
	});
}

module.exports = router;