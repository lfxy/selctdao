var config = require("./config")
var mysql = require("mysql")

exports.create_short = function(){
	return mysql.createConnection(config.database);
}
