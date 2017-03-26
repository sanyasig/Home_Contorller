var lifx = require('./lifx.js');

function doAction(action, callback) {
  console.log("Alarm Triggered");
  console.log(action);
  
  if (action == "arial-button") {
  	 lifx.doAction("bedRoom:OFF", function() {
            response.say("OK");
   });
  }

   if (action == "blank-button") {
  	 lifx.doAction("bedRoom:ON", function() {
            response.say("OK");
   });
  }
};

module.exports.doAction = doAction;