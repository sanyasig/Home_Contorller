var lifx = require('lifx');

var lx = lifx.init();

lx.on('bulbstate', function(b) {
        //console.log('Bulb state: ' + util.inspect(b));
});

lx.on('bulbonoff', function(b) {
        //console.log('Bulb on/off: ' + util.inspect(b));
});

lx.on('bulb', function(b) {
        console.log('New bulb found: ' + b.name + " : " + b.addr.toString("hex"));
});

lx.on('gateway', function(g) {
        console.log('New gateway found: ' + g.ip);
});

lx.on('packet', function(p) {
        // Show informational packets
        switch (p.packetTypeShortName) {
                case 'powerState':
                case 'wifiInfo':
                case 'wifiFirmwareState':
                case 'wifiState':
                case 'accessPoint':
                case 'bulbLabel':
                case 'tags':
                case 'tagLabels':
                //case 'lightStatus':
                case 'timeState':
                case 'resetSwitchState':
                case 'meshInfo':
                case 'meshFirmware':
                case 'versionState':
                case 'infoState':
                case 'mcuRailVoltage':
                        console.log(p.packetTypeName + " - " + p.preamble.bulbAddress.toString('hex') + " - " + util.inspect(p.payload));
                        break;
                default:
                        break;
        }
});


function doAction(action, callback) {
  console.log("Alarm Triggered");
  var b = lx.bulbs['d073d5014163'];
  lx.lightsOff();
};

module.exports.doAction = doAction;
