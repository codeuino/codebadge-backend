const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var axios = require('axios')
var User = require('../../models/Users.js')

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

router.post('/login',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;

  User.find({username:username},{username:1,password:1,type:1,_id:0},(err,user)=>{
    if(user.length==0){
      res.sendStatus(404).send("Not Found")
    }
    else{
        bcrypt.compare(password, user[0].password, function(err, result) {
            // result == true
            if(result===true)
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
        });
    }
  })  
})

router.post('/signup',(req,res)=>{
  var fullname = req.body.fullname
  var username = req.body.username;
  var password = req.body.password;
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
                res.sendStatus(409).send("user already exist");
            }
            else{
            console.log(user)
            axios
            .get(`https://api.github.com/users/${username}`)
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
})

module.exports = router;