// sudo apt-get install android-tools-adb
// adb shell am force-stop packagename to kill

var exec = require('child_process').exec;
var mqtt = require('mqtt')
var ir_controller = require('./ir_controller.js')

var client  = mqtt.connect('mqtt://192.168.0.17:1883')
var fireStick = "192.168.0.66";


function doAction(action, callback) {
  var mainActivity = "";
  console.log("HOME_CONTROLLER: Got action command " + action);

  switch(action) {
    case "kodi":
      mainActivity = "shell am start -n org.xbmc.kodi/.Splash"
      break;

    case "youtube":
      mainActivity = "shell am start -n org.chromium.youtube_apk/.YouTubeActivity"
      break;

    case "reboot":
      mainActivity = "reboot";
      break;   

    default:
        actionCommand = "noting";
  }

if(mainActivity != "" || mainActivity != undefined){
  sendAdb(mainActivity);
} 



function sendAdb(command) {
  var finalCommand = "/usr/bin/adb " + command;

  var child = exec("/usr/bin/adb kill-server", function(error, stdout, stderr) {
    process.stdout.write(stdout);
    process.stderr.write(stderr);

    exec("/usr/bin/adb start-server", function(error, stdout, stderr) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);

      exec("/usr/bin/adb connect 192.168.0.66", function(error, stdout, stderr) {
        process.stdout.write(stdout);
        process.stderr.write(stderr);

        exec(finalCommand, function(error, stdout, stderr) { 
           process.stdout.write(stdout);
           process.stderr.write(stderr);

           exec("/usr/bin/adb shell input keyevent 19", function(error, stdout, stderr) { 
            process.stdout.write(stdout);
            process.stderr.write(stderr);
           
        
          });
       
        });
                
      });
               

    });            


  });

}


};


module.exports.doAction = doAction;