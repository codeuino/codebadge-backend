var schedule = require('node-schedule');
colorsequence=['maroon','dark red','red','green']
expression='* 0 0 ? * MON *'
var everymonday = schedule.scheduleJob(expression, function(){
    //QUERY FOR GITHUB API THIS WILL GIVE RESPONSE FOR EACH USER IT WILL GIVE RESPONSE
    //FOR EACH USER ID RESPONSE WILL BE IN TERM OF A FLAG
    //expression for every second '* * * ? * *' you can test the code with it
    console.log('Job running sucessfully')
});
module.exports=everymonday