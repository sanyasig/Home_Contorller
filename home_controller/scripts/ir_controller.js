
function doAction(action, exec) {
  var actionCommand = "";
  var device = "SAMSUNG_AA59-00600A";
 
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

