const express = require('express');
const router = express.Router()
const axios = require('axios')
var session = require('express-session')
const {github} = require('./../../config/config')
var clientId=github.clientId
var clientSecret=github.clientSecret

router.get('/auth',(req,res)=>{
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
      refresh_token:req.cookies["refresh"]
    };
    
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
      then(res =>{
        return {token:res.data['access_token'],refresh:res.data['refresh_token']}
      })
      .then(tokens => {
        token = tokens.token;
        refresh = tokens.refresh;
        oauth_token=token;
        remember=false;
        if(remember){
          res.cookie('githubLogin',true)
          res.cookie('token',token,{expires: new Date(Date.now() +  + 8*60*60*1000)}) // token expires in 10 years time
          res.cookie('refresh',refresh,{expires: new Date(Date.now() +  + 315360000000)})
        }
        else{
          session({
            secret: 'codebadge token',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
          })
          res.cookie('token',token) // token expires when session ends
          res.cookie('githubLogin',true)
        }
        let config = {
          headers: {
            "Authorization":`token ${oauth_token}`
          }
        }
        
        axios
          .get(`https://api.github.com/user`,config=config)
          .then(resp => {
            res.cookie('username',resp.data["login"],{expires: new Date(Date.now() +  + 315360000000)}) //saves username for upcoming queries of logedin user
            if(resp.data.type=="User"){
              res.redirect('http://localhost:3000/user')
            }
            else{
              res.redirect(`http://localhost:3000/org?username=${resp.data["login"]}`)
            }
          })
          .catch(err=>res.sendStatus(400).json({"error":err}))
        
      }).
      catch(err => {
        res.status(500).json({"error":err});
      });
  })
  
  router.get('/',(req,res)=>{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`);
  })
  

module.exports = router