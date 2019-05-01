var mongoose=require('mongoose');
var schema=mongoose.Schema;
var user=new schema({
    name:{
        type:String
    },
    githubID:{
        type:String
    },
    badgecolor:{
        type:String,
        default:'green'
    },
    last_week_contributions:{
        type:Number
    },
    total_contributions:{
        type:Number
    },
    badges:{
        type:[String]
    }
})
const user=mongoose.model('user',user);
module.exports=user  