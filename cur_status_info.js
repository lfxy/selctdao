var inherits = require("util").inherits;
var Dao = require("./dao");

function CurStatusInfo(){
	Dao.call(this);
	if(this._tab != null){
		this._tab["select_row"] = this.select_row;
	}
	else
		console.log("internal route[key , func] tab not exist!");
}
inherits(CurStatusInfo, Dao);


var ec = require("./error_code")
CurStatusInfo.prototype.add = function(req, resp, ctx){
	console.log( "CurStatusInfo:add");
	
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
		'insert into cur_status_info SET ?', data,
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
			csi_obj.render_resp(resp, ctx);
		}
	);
}
CurStatusInfo.prototype.update = function(req, resp, ctx){
	console.log( "CurStatusInfo:update ");
	resp.result = 0;
	resp.result_string = "OK";
	this.render_resp(resp, ctx);
}
CurStatusInfo.prototype.remove = function(req, resp, ctx){
	console.log( "CurStatusInfo:remove");
	resp.result = 0;
	resp.result_string = "OK";
	this.render_resp(resp, ctx);
}
CurStatusInfo.prototype.find_latest_line_station = function(line, data){
	var ret = { 'line':line};
	var stations = {};
	for( item in  data){
		if(data[item]['line'] == line){
			var sta = data[item]['station']
			if(sta in stations){
				++stations[sta]['count'];
			}
			else{
				var sta_details = {};
				sta_details['count'] = 1;
				sta_details['info'] = data[item];
				stations[sta] = sta_details;
				console.log("details :", sta_details.info);
			}
		}
	}
	ret['stations'] = stations;
	return ret;
}
CurStatusInfo.prototype.select = function(req, resp, ctx){
	console.log( "CurStatusInfo:select");
	var refresh_ts  = parseInt(new Date().getTime()/1000) - 180;
	var csi_obj = this;
	var mysql_conn = require("./mysql_conn").create_short();
	mysql_conn.query(
		'SELECT * FROM cur_status_info where line = ? and refresh_ts > ?', [req.line, refresh_ts],
		function (err, results, fields){
			if(err) {
				console.log("err: ", err);
				resp.result = ec.db_sel_failed;
				resp.result_string = "Insert failed: " + err;
			}
			else{
				resp.result = 0;
				resp.result_string = "OK";
			}
			resp.obj = csi_obj.find_latest_line_station(req['line'], results)
			csi_obj.render_resp(resp, ctx);
	  	}
	);
}
CurStatusInfo.prototype.select_row = function(req, resp, ctx){
	console.log( "CurStatusInfo:select_row");
	resp.result = 0;
	resp.result_string = "OK";
	this.render_resp(resp, ctx);
}

var cur = new CurStatusInfo;
module.exports = function (req, res, next){
	cur.handle(req, res, next);
}
