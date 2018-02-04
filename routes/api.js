var database = require('./mysql');
var router = require('express').Router();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var cookieParser = require('cookie-parser')

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use(cookieParser())

// Middleware to check if token passed is legit and to get user email
router.use(function(req, res, next){
	token = req.cookies.token;
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

router.get('/', function(req,res){
	res.send('YOLO');
});

router.post('/verify', function(req,res){
	res.send({
		'success': true
	});
});

router.post('/question', function(req, res){
	database.getLastQuestion(req.user_email)
	.then(function(question_no){
		return checkIfAllQuestionsAnswered(question_no);
	})
	.then(function(question_no){
		return database.getQuestionDetails(question_no);
	})
	.then(function(questionDetails){
		res.json({
			'success': true,
			'question_no': questionDetails.questionNo,
			'question': questionDetails.question,
			'option1': questionDetails.option1,
			'option2': questionDetails.option2,
			'option3': questionDetails.option3,
			'option4': questionDetails.option4
		});
	})
	.catch(function(err){
		res.json({
			'success': false,
			'error': err
		});
	});
});

router.post('/answer', function(req, res){
	database.getLastQuestion(req.user_email)
	.then(function(question_no){
		return database.getCorrectAnswer(question_no);
	})
	.then(function(answer){
		if(req.body.answer == answer){
			return database.incrementScore(req.user_email);
		}
	})
	.then(function(){
		return database.incrementLastQuestion(req.user_email);
	})
	.then(function(){
		res.redirect('/dashboard.html');
	})
	.catch(function(err){
		console.log({
			'success': false,
			'error': err
		});
		res.redirect('/dashboard.html');
	});
});


function validateToken(token){
	return new Promise(function(resolve, reject){
		if(token)
			resolve(token);
		else
			reject('invalid token');
	});
}

function checkIfAllQuestionsAnswered(question_no){
	return new Promise(function(resolve, reject){
		if(question_no <= config.TOTAL_QUESTIONS){
			resolve(question_no);
		}else{
			reject('challenge complete');
		}
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