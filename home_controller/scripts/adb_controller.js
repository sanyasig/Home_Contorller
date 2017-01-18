// sudo apt-get install android-tools-adb
// adb shell am force-stop packagename to kill

var exec = require('child_process').exec;
var mqtt = require('mqtt')
var ir_controller = require('./ir_controller.js')

var client  = mqtt.connect('mqtt://192.168.0.17:1883')


function doAction(action, callback) {
  var mainActivity = "";
  console.log("HOME_CONTROLLER: Got action command " + action);

  switch(action) {
    case "kodi":
      mainActivity = "org.xbmc.kodi/.Splash"
        break;

    case "youtube":
      mainActivity = "org.chromium.youtube_apk/.YouTubeActivity"
        break;   

    default:
        actionCommand = "noting";
  }

if(mainActivity != "" || mainActivity != undefined){
    ir_controller.doAction("turnon", function() {
            response.say("OK");
         }
     );;

  sendAdb(mainActivity);
} 



function sendAdb(command) {
  var finalCommand = "/usr/bin/adb shell am start -n " + command;

  var child = exec("/usr/bin/adb kill-server", function(error, stdout, stderr) {
    process.stdout.write(stdout);
    process.stderr.write(stderr);

    exec("/usr/bin/adb start-server", function(error, stdout, stderr) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);

      exec("/usr/bin/adb connect 192.168.0.153", function(error, stdout, stderr) {
        process.stdout.write(stdout);
        process.stderr.write(stderr);

        exec(finalCommand, function(error, stdout, stderr) { 
           process.stdout.write(stdout);
           process.stderr.write(stderr);

           exec("/usr/bin/adb shell input keyevent KEYCODE_DPAD_RIGHT", function(error, stdout, stderr) { 
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