var inherits = require("util").inherits;
var HandleBase = require("./handle_base");

function Dao(){
	HandleBase.call(this);
	if(this._tab == null){
		this._tab = {}
	}
	this._tab["add"] 	= this.add,
	this._tab["remove"] = this.remove,
	this._tab["update"] = this.update,
	this._tab["select"] = this.select
}
inherits(Dao, HandleBase)

Dao.prototype.add = function(req, resp, ctx){
	console.log( "dao: add");
}
Dao.prototype.update = function(req, resp, ctx){
	console.log( "dao: update");
}
Dao.prototype.remove = function(req, resp, ctx){
	console.log( "dao:remove");
}
Dao.prototype.select = function(req, resp, ctx){
	console.log( "dao:select");
}

Dao.prototype.call_it = function(req, resp, ctx){
	console.log("czq call it:", req.cmd);
	if(req.cmd in this._tab){
		this._tab[req.cmd].call(this, req, resp, ctx);
	}
	else{
		console.log("error: can not handle the cmd :", req.cmd);
	}
}

module.exports = Dao
