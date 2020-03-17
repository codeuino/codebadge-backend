/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
// const attachments = require('probot-attachments');
module.exports = app => {
  // Your code here
  const axios = require('axios')
  app.log('Yay, the app was loaded!')
  const levelBadges = require('./badgeAllocation/levelBadge')
  const specialBadges = require('./badgeAllocation/speacialBadges')
  app.on('issues.opened', async context => {
    console.log(context.payload.issue.body)
    var user = context.payload.issue.user.login
    let data={
      text:context.payload.issue.body
    }
    axios.post("http://localhost:5000/issue/template",data)
      .then(res=>{
        if(res.data.match){
          // increase points
          var issueComment = context.issue({ body: `Hey @${user} 👋,thanks for raising this issue! Our team will have a look at it. Would you like to work on this issue?` })
          return context.github.issues.createComment(issueComment);
        }
        else{
          var issueComment = context.issue({ body: `Hey @${user} 👋. Please follow the issue template` })
          return context.github.issues.createComment(issueComment);
        }
      })
      .catch(err=>{console.log(err)})
    // return context.github.issues.createComment(issueComment)
  })
  app.on('pull_request.opened', async context => {
    const pr =context.payload.pull_request
    const user = pr.user.login //Collecting Details of the person who created the PR
    let data={
      text:context.payload.issue.body
    }
    axios.post("http://localhost:5000/pr/template",data)
      .then(res=>{
        if(res.data.match){
          var issueComment = context.issue({ body: `Hey @${user} 👋,thanks for th pull request! Our team will have a look at it.` })
          return context.github.issues.createComment(issueComment);
        }
        else{
          var issueComment = context.issue({ body: `Hey @${user} 👋. Please follow the pull request template` })
          return context.github.issues.createComment(issueComment);
        }
      })
      .catch(err=>{console.log(err)})
  })
  
  app.on('issue_comment.created', async context => {
    // if(context.github.issues.t)
    if(context.payload.comment.user.login!=="codebadge-test1[bot]"){
      // const issueComment = context.issue({ body: `Thanks for making a comment ` })
      const user = context.payload.comment.user.login
      const org = context.payload.organization.login
      // if(levelBadges.new_commer(context.payload.comment.user.login)){
      //   const msg=context.issue({body:`Hey @${user} 👋, Thanks for the putting up your views !!! You looks to be a new commer to @${org}. You are earning a **bigginer's badge** for your first contribution. Keep contributing!:clap:\n<img src="https://image.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg" alt="drawing" width="100"/> `})
      //   return context.github.issues.createComment(msg)
      // }
      // else if(levelBadges.learners(context.payload.comment.user.login)){
      //   const msg=context.issue({body:`Hey @${user} 👋, Thanks for the putting up your views !!! You looks to be a new commer to @${org}. You are earning a **bigginer's badge** for your first contribution. Keep contributing!:clap:\n<img src="https://image.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg" alt="drawing" width="100"/> `})
      //   return context.github.issues.createComment(msg)
      // }
      // else if(levelBadges.experienced(context.payload.comment.user.login)){
      //   const msg=context.issue({body:`Hey @${user} 👋, Thanks for the putting up your views !!! You looks to be a new commer to @${org}. You are earning a **bigginer's badge** for your first contribution. Keep contributing!:clap:\n<img src="https://image.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg" alt="drawing" width="100"/> `})
      //   return context.github.issues.createComment(msg)
      // }
      // else if(levelBadges.coreContributor(context.payload.comment.user.login)){
      //   const msg=context.issue({body:`Hey @${user} 👋, Thanks for the putting up your views !!! You looks to be a new commer to @${org}. You are earning a **bigginer's badge** for your first contribution. Keep contributing!:clap:\n<img src="https://image.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg" alt="drawing" width="100"/> `})
      //   return context.github.issues.createComment(msg)
      // }
      // else{
      //   const url = "https://cdn5.vectorstock.com/i/1000x1000/03/39/expert-round-isolated-gold-badge-vector-16610339.jpg"
      //   const msg=context.issue({body:`Hey @${user} 👋, Thanks for the putting up your views !!! It looks that you have experticed working with @${org} and its projects. You are earning a **expert's badge** for your immence contribution. Keep contributing!:clap:\n<img src=${url} alt="drawing" width="100"/> `})
      //   return context.github.issues.createComment(msg)
      // }
      // return context.github.issues.createComment(issueComment)
    }
  })

  // app.on('push', async context => {
  //   const issueComment = context.issue({ body: 'Thanks for push' })
  //   return context.github.pull_request.createComment(issueComment)
  // })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}