var inherits = require("util").inherits;
function HandleBase(){
	this._tab = {}
}
HandleBase.prototype.call_it = function (req, resp){
	console.log("do......");
}
HandleBase.prototype.handle = function(req, res, next){
	console.log("\n..... Request :", req.body);	
	var resp = {}
	this.call_it(req.body, resp, {"hreq":req, "hres":res, "hnext":next});
	console.log("..... Resp    :", resp, "\n");
}
HandleBase.prototype.render_resp = function (resp, ctx){
	ctx.hres.jsonp(resp);
	ctx.hres.end();
	console.log( "Response:", resp);
}

module.exports = HandleBase;
