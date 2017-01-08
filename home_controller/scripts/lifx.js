var needle = require('needle');

var url = "https://api.lifx.com/v1/lights/all/state";
var auth = "c722eca598537ff4b850e6bccc7a62ce52a160562e5d5e0887e7af567548a602";

var headers = {
  headers: { 'Authorization': 'Bearer ' + auth }
}

var powerState = {};

var toggleState = function (powerState){
	console.log(powerState)
	needle.put(url, powerState, headers, function(err, resp, body) {
	   	console.log(body);
	});
}

var options = {
	"poweron": function() {
					powerState.power = "on"; toggleState(powerState);
	           },
    "poweroff": function() {
					powerState.power = "off"; toggleState(powerState);
	           },
};


function doAction(action, callback) {
	action = action.trim();
	action = action.toLowerCase();
	var call = options[action];

	if (call != undefined) {
	    options[action]();
	}	

}; 

module.exports.doAction = doAction;


// so the light stays conencted
var minutes = 20, the_interval = minutes * 60 * 1000;
setInterval(function() {
        needle.get('https://api.lifx.com/v1/lights/all', options, function(err, resp, body) {
	   	console.log(body);
	});
}, the_interval);