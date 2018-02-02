var database = require('./mysql');
var router = require('express').Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.get('/', function(req, res){
	res.send('Dashboard');
});

router.post('/', function(req,res){
	console.log(req.body);
	res.send(true);
});

module.exports = router;