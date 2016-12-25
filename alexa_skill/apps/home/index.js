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
      "utterances" : ["{TvAction} {tv|tele}"]
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