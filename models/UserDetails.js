const mongoose = require(mongoose);
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
    username: String,
    resetTime:{
        weekly:Date,
        monthly: Date,
        yearly: Date
    },
    history:[{
        commitLink:String,
        pointsAlloted:Number,
        date:Date
    }],
    organizations:[
    {
        name: String,
        points : {
            total: Numeric,
            designing:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
            frontend:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
            backend:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
            testing:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
            docs:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
            social:{
                total:Numeric,
                weekly:Numeric,
                monthly: Numeric,
                yearly: Numeric
            },
        },
        badges: [{badgeName:String,badgeFor:String}],
        Role:[{team:String,access:String}]
        }]
    }
);
// Compile model from schema
var userDetailsModel = mongoose.model('userDetails', userDetailsSchema );
module.exports=userDetailsModel;