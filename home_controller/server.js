//sudo lircd -d /dev/lirc0
var mqtt = require('mqtt')
var apiKey = 'dUtzt_YIPoeVmj3DuemRom';
var IFTTTMaker = require('iftttmaker')(apiKey);

var client  = mqtt.connect('mqtt://192.168.0.17:1883')

var subscriptions = {
	'home/lights' : require('./scripts/lifx.js'),
	'home/tv' : require('./scripts/ir_controller.js'),
  'home/adb': require('./scripts/adb_controller.js'),
  'home/kodi': require('./scripts/kodi_controller.js'),
  'routine/morning': require('./scripts/morning.js'),
  'home/dash': require('./scripts/amazonDash.js'),
   'home/alarm': require('./scripts/alarm.js')

}

for (k in subscriptions) {
		console.log("Subscribing to Message : " + k);
       client.subscribe(k);
}

console.log("launching Home Controller");
client.on('message', function (topic, message) {
  var action = message.toString('utf8');
  console.log("HOME_CONTROLLER: Got TOPIC " + topic);
  var controller = subscriptions[topic];

  console.log(controller);
  if (controller != undefined) {
  	controller.doAction(action, function() {
            response.say("OK");
         }
     );
  }  
})



