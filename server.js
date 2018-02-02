const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'))

var dashboard = require('./routes/api.js');
app.use('/api', dashboard);

var user = require('./routes/user.js');
app.use('/user', user);

app.listen(3000, function(){
	console.log('Server started on port 3000');
});