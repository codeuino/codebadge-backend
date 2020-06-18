const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var badgesSchema = new Schema({
    badgeName:String,
    badgeImage:String
});
// Compile model from schema
var badgesModel = mongoose.model('badges', badgesSchema );
module.exports=usersModel;