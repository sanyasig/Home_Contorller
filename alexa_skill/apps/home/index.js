'use strict';

const _ = require('lodash');
const Alexa = require('alexa-app');
const SSH = require('simple-ssh');
var app = new Alexa.app('home');
var mqtt = require('mqtt')

// home/tv
// home/lights

var ssh = new SSH({
    host: '192.168.0.26',
    user: 'nani',
    pass: 'nani76gsrao'
});

//app.dictionary = {"exTvActions":["turnon","turnoff","mute","shutdown","turnup","turndown"]};

app.launch(function(req, res) {
    var prompt = 'To control home, give me a command';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});


app.intent('contorlTv',
  {
       "slots":{"TvAction": "TvAction" },
      "utterances" : ["{-|TvAction} {the | } {tv|tele}"]
  },
  function(request,response) {
       console.log("ALEXA: tv control");
       var action = request.slot('TvAction');
       console.log("ALEXA: SENDINNG MQTT home/tv-" + action);
       var client  = mqtt.connect('mqtt://192.168.0.17:1883')
       client.publish('home/tv', action);
       client.end()
       response.say("OK");
    }
);
   


app.intent('shoutDownPC',
  {
    "utterances":[ "{shutdown|turnoff} {my |} {laptop|computer|pc}" ]
  },
  function(request,response) {
    console.log("in shutdown ");
    ssh
    .exec('sudo shutdown -h now', {
        pty: true,
        out: console.log.bind(console)
    }).start();
    response.say("shutting down now");
  }
);

app.intent('bedtime',
  {
     "utterances":[ "{its|to|for|} {time| } {start|to goto| } {bedtime|sleep|bed}"]
  },
  function(request,response) {
    console.log("in bedtime");
    // turn lights and tv off
    var client  = mqtt.connect('mqtt://192.168.0.17:1883')
    client.publish('home/tv', 'turnoff');
    client.publish('home/lights', 'turnoff');
    client.end()
    //request.session('currenQuestion','gym');
    response.say("turning lights and tv off, are you going to gym tomorrow?").shouldEndSession(false);
  }
);

app.intent('answerYes',
  {
     "utterances":["{yes|yeah}"]
  },
  function(request,response) {
    // of now assume only question we ever ask is for gym?
    console.log("in yes");
    //var question = request.session('currenQuestion');
    var question = "gym";
    var client  = mqtt.connect('mqtt://192.168.0.17:1883')
    client.publish('home/alarm', '5:45');
    client.end()
    response.say("setting the alarm for five fortyfive AM, Good night and sleep well");
  }
);

app.intent('answerNO',
  {
     "utterances":["{no|nop}"]
  },
  function(request,response) {
    var client  = mqtt.connect('mqtt://192.168.0.17:1883')
    client.publish('home/alarm', '7:45');
    client.end();
   response.say("setting the alarm for seven forty five AM");
  }
);


module.change_code = 1;
module.exports = app;


// this is an sample intenet to create one later 
// app.intent('numberIntent',
//   {
//      "slots":{"number":"NUMBER"}
//     ,"utterances":[ "say the number {1-100|number}" ]
//   },
//   function(request,response) {
//     var number = request.slot('number');
//     response.say("You asked for the number "+number);
//   }
// );