const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    fullname:{ type: String, required: 'true' },
    username: { type: String, required: 'true' },
    email:{type:String},
    password: String,
    type:String,
});
// Compile model from schema
var usersModel = mongoose.model('users', usersSchema );
module.exports=usersModel;