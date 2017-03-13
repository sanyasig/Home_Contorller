var lifx = require('./lifx.js');

function doAction(action, callback) {
  console.log("Alarm Triggered");
  lifx.doAction("bed-room", function() {
            response.say("OK");
         });
};

module.exports.doAction = doAction;