var database = require('./src/mysql');

database.addUser('', '', '', '', function(callback){
  console.log(callback);
});