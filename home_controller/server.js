var mqtt = require('mqtt')
var exec = require('child_process').exec;

// home/tv
// home/lights
var ir_Controller = require('./scripts/ir_controller.js');
var client  = mqtt.connect('mqtt://192.168.0.17:1883')
client.subscribe('home/tv');


client.on('message', function (topic, message) {
  var action = message.toString('utf8');
  ir_Controller.doAction(action, exec, function() {
         response.say("OK");
  });
})
