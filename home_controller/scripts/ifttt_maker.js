var schedule = require('./scheduler.js');

function doAction(action, IFTTTMaker) {
   
 console.log("inifttt maker");
  var request = {
    event: action,
    values: {}
  };
   
  IFTTTMaker.send(request, function (error) {
    if (error) {
      console.log('The request could not be sent:', error);
    } else {
      // set the scheduler here 
    }
  });
};

module.exports.doAction = doAction;
