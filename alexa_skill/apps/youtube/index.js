'use strict';

//kodi(kodiHost, kodiPort).then(function(connection) {
//         connection.Player.Open({
//    item: {
//      file: 'plugin://plugin.video.youtube/?action=play_video&videoid=UPftsIwGNoQ'
//    }
//  });
const Alexa = require('alexa-app');
const app = new Alexa.app('youtube');
const SSH = require('simple-ssh');
const search = require('youtube-search');
const kodi = require('kodi-ws');
var $ = require("jquery");

const kodiHost = "192.168.0.10";
const kodiPort = 9090;

var opts = {
  maxResults: 10,
  key: 'AIzaSyAwbT0z7jEY69GgeJkbyXkIK7Gshj2XDqs'
};

app.launch(function(req, res) {
    var prompt = 'what so yout want me to play on youtube';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('playYoutube', {
    'slots': {"videmoName": "videmoName", "Artist":"Artist", "Title":"Title"},
    'utterances' : ['{play} {-|videmoName} {by |} {-|Artist}',
                    '{play video} {-|Title}']
  }, function(req, res) {
     console.log(req);
     var artist = req.slot('Artist');
     var searchString = req.slot('videmoName');
     if(artist != undefined){
     	searchString = searchString + " by " + req.slot('Artist');
      }
     console.log(searchString);
     console.log(req.slot('videmoName'));
     console.log(req.slot('Artist'));
     console.log(req.slot('Title'));

    search(searchString, opts, function(err, results) {
      if(err) return console.log(err);
      console.log(results[0].id);
      console.log(results[0].link);
      kodi(kodiHost, kodiPort).then(function(connection) {
         connection.Player.Open({
    	    item: {
               file: 'plugin://plugin.video.youtube/?action=play_video&videoid=' + results[0].id
            }
            });
    });
});
});

module.change_code = 1;
module.exports = app;
