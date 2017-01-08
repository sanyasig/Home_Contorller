//sudo lircd -d /dev/lirc0
var mqtt = require('mqtt')
var exec = require('child_process').exec;
var apiKey = 'dUtzt_YIPoeVmj3DuemRom';
var IFTTTMaker = require('iftttmaker')(apiKey);
 

// home/tv
// home/lights
var irController = require('./scripts/ir_controller.js');
var iftttMaker = require('./scripts/ifttt_maker.js');

var client  = mqtt.connect('mqtt://192.168.0.17:1883')
client.subscribe('home/alarm');
client.subscribe('home/lights');
client.subscribe('home/tv');


console.log("launching Home Controller");
client.on('message', function (topic, message) {
  var action = message.toString('utf8');
  console.log("HOME_CONTROLLER: Got TOPIC " + topic); 
  switch(topic) {
    case "home/tv":
        console.log("reveiver TV mesage");
        irController.doAction(action, exec, function() {
            response.say("OK");
        });
        break;
    case "home/alarm":
        iftttMaker.doAction("alarm-5:45", IFTTTMaker, function() {
          response.say("OK");
        });
    break;    
    default:
        actionCommand = "noting";
  }
})



