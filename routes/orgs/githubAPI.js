const express = require('express');
const router = express.Router()
const axios = require('axios')
var session = require('express-session')
const {github} = require('./../../config/config')
var clientId=github.clientId
var clientSecret=github.clientSecret

router.get('/getOrgMembers',(req,res)=>{
    var username=req.query.username
    var oauth_token=req.query.token
    var githubLogin=req.query.githubLogin
    console.log(username)
    if(githubLogin=="false"){
        console.log(githubLogin)
        axios.get(`https://api.github.com/orgs/${username}/members`)
        .then(resp=>{console.log(resp.data);res.json(resp.data)})
        .catch(err=>res.send(err))
    }
    else{
        let config = {
            headers: {
              "Authorization":`token ${oauth_token}`,
            }
          }
        console.log(githubLogin,config)
        axios.get(`https://api.github.com/orgs/${username}/members`,config=config)
        .then(resp=>{console.log(resp.data);res.json(resp.data)})
        .catch(err=>res.send(err))
    }
})

module.exports = router;