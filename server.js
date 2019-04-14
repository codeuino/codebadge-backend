// const express=require('express')
// const mongoose=require('mongoose')
// const app = express()
// const route=require('./routes')
// const secret = require('./config/credentials.js');
// const jobs=require('./jobs/everyweek')
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())
// mongoose.connect(secret.database,{ useNewUrlParser: true },function() {
//     console.log('database connected');
//   });
// const PORT=process.env.PORT||3000;
// jobs.everymonday
// app.use(route)
// app.listen(PORT)
var request = require('request');
request('https://api.github.com/repos/users/TG1999/orgs', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});