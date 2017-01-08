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
      var date = new Date();
      date.setDate(date.getDate() + 1);

      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = (month < 10 ? "0" : "") + month;
      var day  = date.getDate();
      day = (day < 10 ? "0" : "") + day;
      console.log(year);
      console.log(month);
      console.log(day);
      // set the scheduler here 
    }
  });
};

module.exports.doAction = doAction;
