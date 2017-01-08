var schedule = require('node-schedule');

function doAction(date) {
   var j = schedule.scheduleJob(date, function(){
      console.log('The world is going to end today.');
   }); 
 };  
module.exports.doAction = doAction;