const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var {get} = require('axios')
var User = require('../../models/Users.js')
let {errorHandler,ErrorHandler} = require('./../../_helper/error-handler')
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',async (req,res,next)=>{
try{
    var username = req.body.username;
    var password = req.body.password;
    console.log(username,password)
    if(username=="" || password==""){throw new ErrorHandler(400, 'Username and Password required')}
    else{
        console.log(username)
        await User.find({username:username},{username:1,password:1,type:1,_id:0},(err,user)=>{
            try{    
                if(user.length==0){
                    throw new ErrorHandler(404, 'Username not found');
                }
                else{
                    bcrypt.compare(password, user[0].password, function(err, result) {
                        // result == true
                        if(!result){throw new  ErrorHandler(401, 'Incorrect password');}
                        else{
                            console.log(user)
                            res.cookie('token',makeid(16))
                            res.cookie('username',user[0].username)
                            res.cookie('githubLogin',false)
                            console.log(user[0].type)
                            if(user[0].type=="User"){
                                res.redirect(`http://localhost:3000/user?username=${username}`)
                            }
                            else{
                                res.redirect(`http://localhost:3000/org?username=${username}`)
                            }
                        }
                    });
                }
                next();
            }
            catch(error){next(error);}
            })
        }     
    }
    catch(error){
        next(error);
    } 
})

router.post('/signup',(req,res)=>{
    try{
  var fullname = req.body.fullname
  var username = req.body.username;
  var password = req.body.password;
  if(username=="" || password=="" || fullname==""){throw new ErrorHandler(400, 'Username,Fullname and Password required')}
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

        console.log(fullname,username,password)
        let user = {
            fullname:fullname,
            username:username,
            password:hash,
            type:""
        }
        User.find({username:username},(err,users)=>{
            if(users.length!==0){
                throw new  ErrorHandler(409, 'User already exists');
            }
            else{
            console.log(user)
            get(`https://api.github.com/users/${username}`)
            .then(resp => {
                user.type=resp.data.type
                console.log(user)
                var newUser = new User(user)
                newUser.save()
                console.log("saved")
                return user
            })
            .then(user=>{
                console.log(user)
                res.cookie('token',makeid(16))
                console.log("token")
                res.cookie('username',username)
                console.log("username")
                res.cookie('githubLogin',false)
                console.log("github login")
                if(user.type=="User"){
                    res.redirect(`http://localhost:3000/user?username=${username}`)
                }
                else{
                    res.redirect(`http://localhost:3000/org?username=${username}`)
                }
            })
            .catch(err=>res.json({"error":err}))
            }
        })
        });
    });
    next();
    }
    catch(error){
        next(error);
    }
})

router.use((err, req, res, next) => {
    errorHandler(err, res);
  });

module.exports = router;