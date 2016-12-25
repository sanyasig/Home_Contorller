var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.0.17:1883')
 
client.on('connect', function () {
  client.subscribe('presence')
  client.publish('pi', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
  client.end()
})