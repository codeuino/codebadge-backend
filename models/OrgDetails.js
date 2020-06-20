const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orgDetailsSchema = new Schema({
    members:[
        {
            username: String,
            role:String
        }
    ],
    requests:[
        {
            expires:Date,
            author:String,
            title:String,
            descriptions:String,
            links:Array=[],
            allotedPoints: Number,
            extraPoints: Number
        }
    ],
    defaultPoints:{
        issue:{
            initial:{type:Number,default:10},
            appreciableComment:{
                member:{type:Number,default:2},
                nonMember:{type:Number,default:1}
            },
            tags:{
                newFeature:{type:Number,default:1},
                design:{type:Number,default:1},
                enhancements:{type:Number,default:1},
                bug:{type:Number,default:1},
                testing:{type:Number,default:1}
            },
            commitPoints:{type:Number,default:1},
            hateSpeechTest:{
                hate:{type:Number,default:-1},
                noHate:{type:Number,default:1}
            }
        },
        pr:{
            initial:{type:Number,default:10},
            appreciableComment:{
                member:{type:Number,default:2},
                nonMember:{type:Number,default:1}
            },
            tags:{
                newFeature:{type:Number,default:2},
                design:{type:Number,default:2},
                enhancements:{type:Number,default:2},
                bug:{type:Number,default:2},
                testing:{type:Number,default:2}
            },
            commitPoints:{type:Number,default:1},
            testImprovement:{
                true:{type:Number,default:2},
                false:{type:Number,default:-1}
            },
            hateSpeechTest:{
                hate:{type:Number,default:-1},
                noHate:{type:Number,default:1}
            }
        },
        comments:{
            initial:{type:Number,default:2},
            appreciableComment:{
                member:{type:Number,default:2},
                nonMember:{type:Number,default:1}
            },
            hateSpeechTest:{
                hate:{type:Number,default:-1},
                noHate:{type:Number,default:1}
            }
        }
    },
    Badges:[
        {
            type:String,
            badgeId:String,
            use:String
        }
    ],
    githubTemplates:{
        issue:String,
        pr:String
    }
});
// Compile model from schema
var orgDetailsModel = mongoose.model('orgDetails', orgDetailsSchema );
module.exports=orgDetailsModel;