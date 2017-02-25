const kodi = require('kodi-ws');
var kodi_ip = "192.168.0.66";

function doAction(action, callback) {

  console.log("in kodi controller");
  
  kodi(kodi_ip, 9090).then(function (connection) {
     connection.Application.SetVolume(10);
     
     connection.Player.Open({
        item: {
          file:  'plugin://plugin.video.youtube/?action=play_video&videoid=lGcmuBMjJIA'
         }
      });

   });

};

module.exports.doAction = doAction;
