var exec = require('child_process').exec;

function doAction(action, callback) {
  var actionCommand = "";
  var device = "SAMSUNG_AA59-00600A";
  console.log("HOME_CONTROLLER: Got action command " + action); 
  switch(action) {
    case "turn on":
    case "turn off":
    case "turnon":
    case "turnoff":
    case "shutdown":
        actionCommand = "KEY_POWER";
        device = "SAMSUNG_AA59-00600A_POWER KEY_POWER";
        break;

    case "mute":
    case "unmute":
    case "un mute":
        actionCommand = "KEY_MUTE";
        break;

    case "volumeup":
    case "volume up":
    case "turn up":
    case "turnup":
        actionCommand = "KEY_VOLUMEUP";
        break;

    case "volumedown":
    case "volume down":
    case "turn down":
    case "turndown":
        actionCommand = "KEY_VOLUMEDOWN";
        break;    

    default:
        actionCommand = "noting";
  }

  var command = "irsend SEND_ONCE " + device + " " + actionCommand;
  console.log("RUNNIGN COMMAND : " + command);
  var child = exec(command, function(error, stdout, stderr) {
          if (error) console.log(error);
          process.stdout.write(stdout);
          process.stderr.write(stderr);
        });
};


module.exports.doAction = doAction;

