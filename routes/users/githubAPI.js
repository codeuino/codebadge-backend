const express = require('express');
const router = express.Router()
const {get,post} = require('axios')
var session = require('express-session')
const {github} = require('./../../config/config')
var clientId=github.clientId
var clientSecret=github.clientSecret
let {ErrorHandler,errorHandler} = require('../../_helper/error-handler') 
router.get('/getUserProfile',(req,res,next)=>{
    username = req.query.username
    get(`https://api.github.com/users/${username}`)
        .then(resp => {
          res.send(resp.data)
        })
        .catch(err=>{
            throw new ErrorHandler(404,`${username} is not a valid username`)
        })
        .catch(error=>next(error))
  })
  
  router.get('/getUserOrgs',(req,res,next)=>{
      oauth_token=req.query.token
      username=req.query.username
      githubLogin=req.query.githubLogin
      if(githubLogin=="false"){
        get(`https://api.github.com/users/${username}/orgs`)
        .then(resp => {
          res.send(resp.data)
        })
        .catch(err=>{
            throw new ErrorHandler(404,`${username} is not a valid username`)
        })
        .catch(error=>next(error))
      }
      else{
        console.log("githubLogin",githubLogin)
        let config = {
          headers: {
            "Authorization":`token ${oauth_token}`,
          }
        }
        get(`https://api.github.com/user/orgs`,config=config)
        .then(resp => {
          console.log(resp.data.length)
          return resp.data
        })
        .then(orgs=>{
          var list_orgs=orgs;
          let config = {
            headers: {
              "Authorization":`token ${oauth_token}`
            }
          }
          get(`https://api.github.com/users/${username}/orgs`,config=config)
          .then(resp1 => {
            console.log(resp1.data.length)
            var flag,elem;
            resp1.data.forEach(element => {
              flag=0;
              elem=element
              list_orgs.forEach(element1=>{
                if(element1.login==element.login){
                  flag=1;
                }
              })
              if(flag==0){
                list_orgs.push(elem);
              }
            });
            res.send(list_orgs)
          })
        })
        .catch(err=>{
            throw new ErrorHandler(err.response.status,err.response.statusText)
        })
        .catch(error=>next(error))
      }
  })
  
  router.get('/getUserRepos',(req,res,next)=>{
      oauth_token = req.query.token
      let config = {
        headers: {
          "Authorization":`token ${oauth_token}`,
        }
      }
      console.log(config)
      username = req.query.username
      if(username!==undefined){
        get(`https://api.github.com/users/${username}/repos`,config=config)
        .then(resp => {
          res.send(resp.data)
        })
        .catch(err=>{
            throw new ErrorHandler(err.response.status,err.response.statusText)
        })
        .catch(error=>next(error))
      }
      else{
        get(`https://api.github.com/user/repos`,config=config)
        .then(resp => {
          res.send(resp.data)
        })
        .catch(err=>{
            throw new ErrorHandler(err.response.status,err.response.statusText)
        })
        .catch(error=>next(error))
      }
  })
  
  router.get('/getUserData',(req,res,next)=>{
      var oauth_token=req.query.token;
      var username=req.query.username;
      var githubLogin = req.query.githubLogin;
      if(githubLogin=="true"){
        console.log({"Authorization": `token ${oauth_token}`})
        let config = {
          headers: {
            "Authorization":`token ${oauth_token}`
          }
        }
        get(`https://api.github.com/user`,config=config)
          .then(resp => {
            res.cookie('username',resp.data["login"],{expires: new Date(Date.now() +  + 315360000000)}) //saves username for upcoming queries of logedin user
            res.json(resp.data)
          })
          .catch(err=>{
              throw new ErrorHandler(err.response.status,err.response.statusText)
          })
          .catch(error=>next(error))
      }
      else{
        console.log("not github login")
        get(`https://api.github.com/users/${username}`)
        .then(resp => {
          res.cookie('username',resp.data["login"],{expires: new Date(Date.now() +  + 315360000000)}) //saves username for upcoming queries of logedin user
          res.json(resp.data)
        })
        .catch(err=>{
            throw new ErrorHandler(err.response.status,err.response.statusText)
        })
        .catch(error=>next(error))
      }
    })

router.get('/auth',(req,res,next)=>{
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
      refresh_token:req.cookies["refresh"]
    };
    
    const opts = { headers: { accept: 'application/json' } };
    post(`https://github.com/login/oauth/access_token`, body, opts).
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
        
        get(`https://api.github.com/user`,config=config)
          .then(resp => {
            res.cookie('username',resp.data["login"],{expires: new Date(Date.now() +  + 315360000000)}) //saves username for upcoming queries of logedin user
            if(resp.data.type=="User"){
              res.redirect('http://localhost:3000/user')
            }
            else{
              res.redirect(`http://localhost:3000/org?username=${resp.data["login"]}`)
            }
          })
          .catch(err=>{
              throw new ErrorHandler(err.response.status,err.response.statusText)
          })
          .catch(error=>next(error))
      })
      .catch(err=>{
          throw new ErrorHandler(err.response.status,err.response.statusText)
      })
      .catch(error=>next(error))
  })
  
  router.get('/',(req,res,next)=>{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`);
  })
  router.use((err, req, res, next) => {
    errorHandler(err, res);
  });

module.exports = router