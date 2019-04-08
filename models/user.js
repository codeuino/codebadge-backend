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
    }
})
const user=mongoose.model('user',user);
module.exports=user  