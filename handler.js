
var TestDao = require("./TestDao");
var cur_status_info = require("./cur_status_info");
var handle_c = require("./handle_c");
var select_dao = require("./select_dao");

var route  = [
	{ url : '/jsonA', cb : TestDao},
	{ url : '/cur_status_info', cb : cur_status_info},
	{ url : '/jsonC', cb : handle_c},
	{ url : '/h_select', cb : select_dao}
];


exports.Route = route;
