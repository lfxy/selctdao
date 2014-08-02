
var inherits = require("util").inherits;
var Dao = require("./dao");

function SelectDao(){
	Dao.call(this);
}

inherits(SelectDao, Dao);

var ec = require("./error_code")
SelectDao.prototype.add = function(req, resp, ctx){
	console.log( "SelectDao:add");
	
	var data = {};
	data["id"] = req["id"]
	data["imei"] = req["imei"]
	data["line"] = req["line"]
	data["station"] = req["station"]
	data["vote"] = req["vote"]
	data["batch_no"] = req["batch_no"]
	data["city"] = req["city"]
	data["refresh_ts"] = req["refresh_ts"]

	var csi_obj = this;
	var mysql_conn = require("./mysql_conn").create_short();
	mysql_conn.query(
		'insert into selectdao SET ?', data,
		function(err, result){
			if(err) { 
				console.log("err: ", err);
				resp.result = ec.db_ins_failed;
				resp.result_string = "Insert failed: " + err;
			}
			else{
				resp.insertId = result.insertId;
				resp.affectedRows = result.affectedRows;
				resp.result = 0;
				resp.result_string = "OK";
			}
			csi_obj.render_resp(resp, ctx);
		}
	);
}
