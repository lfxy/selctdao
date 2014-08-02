var HandleBase = require("./handle_base");

function HandleC(){
	HandleBase.call(this);
}
HandleC.prototype = new HandleBase();
HandleC.prototype.call_it = function(req, resp, ctx){
	console.log("do......C");
}

module.exports = function(req, res, next){
	new HandleC().handle(req, res, next);
}
