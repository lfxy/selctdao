var inherits = require("util").inherits;
var Dao = require("./dao");
function TestDao(){
	Dao.call(this);
}
inherits(TestDao, Dao);

var ec = require("./error_code")
TestDao.prototype.add = function(req, resp, ctx){
	console.log( "TestDao:add");

	var mysql_conn = require("./mysql_conn").create_short();
	var tobj = this;
	mysql_conn.query(
		'insert into tbl_test SET ?', {name:req.name, message:req.message}, 
		function(err, result){
			if(err) { 
				console.log("err: ", err);
				resp.result = ec.db_ins_failed;
				resp.result_string = "Insert failed: " + err;
			}
			else{
				console.log( "new record row id : " +  result.insertId);
				console.log( "affectedRows " +  result.affectedRows + ' rows');

				resp.insertId = result.insertId;
				resp.affectedRows = result.affectedRows;
				resp.result = 0;
				resp.result_string = "OK";
			}
			tobj.render_resp(resp, ctx);
		}
	);
}
TestDao.prototype.update = function(req, resp, ctx){
	console.log( "TestDao:update ");
	var tobj = this;
	var mysql_conn = require("./mysql_conn").create_short();
	mysql_conn.query(
		'update tbl_test SET ? where id = 2',
		{name:'update hello',message:'upd hell'}, 
		function(err, result){
			if(err) {
				console.log("err: ", err);
				resp.result = ec.db_upd_failed;
				resp.result_string = "Insert failed: " + err;
			}
			else{
				console.log("changed  " + result.changedRows + ' rows');
				resp.changedRows = result.changedRows;
				resp.result = 0;
				resp.result_string = "OK";
			}
			tobj.render_resp(resp, ctx);
		}
	);
}
TestDao.prototype.remove = function(req, resp, ctx){
	console.log( "TestDao:remove");
	resp.result = 0;
	resp.result_string = "OK";
	//this.render_resp(resp, ctx);
}
TestDao.prototype.select = function(req, resp, ctx){
	console.log( "TestDao:select");
	var tobj = this;
	var mysql_conn = require("./mysql_conn").create_short();
	mysql_conn.query(
		'SELECT * FROM tbl_test',
		function (err, results, fields){
			if(err) {
				console.log("err: ", err);
				resp.result = ec.db_sel_failed;
				resp.result_string = "Select failed: " + err;
			}
			else{
				console.log("selected rows : ", results);
				resp.result = 0;
				resp.result_string = "OK";
			}
			tobj.render_resp(resp, ctx);
	  	}
	);
}
var testDao = new TestDao();
module.exports = function(req, res, next){
	testDao.handle(req, res, next);
}
