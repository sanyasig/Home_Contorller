'use strict';

const _ = require('lodash');
const Alexa = require('alexa-app');
const SSH = require('simple-ssh');
var app = new Alexa.app('home');

var ssh = new SSH({
    host: '192.168.0.26',
    user: 'nani',
    pass: 'nani76gsrao'
});

app.launch(function(req, res) {
    var prompt = 'To control home, give me a command';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('numberIntent',
  {
    "slots":{"number":"NUMBER"}
    ,"utterances":[ "say the number {1-100|number}" ]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
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
