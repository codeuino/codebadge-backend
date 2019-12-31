# About Codebadge

[![Online Status](https://img.shields.io/website/http/prabhani.me/Codebadge.svg?down_message=offline&up_message=online)](http://prabhani.me/Codebadge)
[![Build Status](https://travis-ci.com/PrabhaniN/Codebadge.svg?branch=master)](https://travis-ci.com/PrabhaniN/Codebadge)
![Language Count](https://img.shields.io/github/languages/count/PrabhaniN/codebadge.svg)
[![License](https://img.shields.io/github/license/PrabhaniN/codebadge.svg)](https://github.com/PrabhaniN/Codebadge/blob/master/LICENSE)

CodeBadge is a project which takes official GitHub API into consideration and makes a fading badges graph for each organization. This project would be organization-oriented project i.e. each organization will need to serve it on a reserved route, say /codebadge. For eg: If coala wants to integrate CodeBadge, they’ll serve this project on coala.io/codebadge. Our aim is to make CodeBadge as a standard such that people start using it as a measure in order to test their skill level/track their progress in a specific community. For eg, Competitive Coding guys test their skills by asking each other what’s their rank on HackerRank / HackerEarth! Likewise, open-source contributors should start asking, **Hey! What badge did you recently earned on CodeBadge!**

### Why do we need CodeBadge?
- To track and incorporate contributors’ progress in the community or community’s progress as a whole. Making a one-stop platform to find each contributor’s progress rather than finding it separately for each contributor.
- To show the progress by awarding some really cool badges to top contributors in order to keep them connected towards the community.
- Auto-assign related issues to most active contributors using tagging to keep contributors connected.


### Features

- GitHub Heatmaps are for each person’s profile and can be observed from visiting each contributor’s profile specifically. Whereas, our aim is to show a complete fading graph for an organization, which would hence be capable of showing each contributor’s progress as well.
- There would be some pre-built badges by us as well as we offer the organization to design their own badges. This can be done by the illustrator which we are developing for this project.
- Pre-defined badges could be based on some achievement levels like Baby-Steps, Not-a-Newbie, Almost-Pro, Legendary-Committer, etc which could be awarded by setting some convention like a number of merged PRs or difficulty of issues resolved by the person.
- Creating/Integrating a bot with our platform which would auto-assign/auto-suggest related issues to the top-most active contributors of the community on the basis of tagging, like what their recent PRs were based upon.
- Admin Dashboard creation which would show notifications/cards for whosoever earned any new badge. Community Admins should have some extra privileges to award any extra badge to an extraordinary contributor say Committer-of-the-Month, Top-Contributor, GOAT(Greatest-of-all-Times), etc manually.
- The illustrator will provide the user with an interface which will help the organization to design their own badges. It has a special feature of making a sketch outline of any image which is uploaded. Once a template is uploaded by any user it will also be available to be used by other organizations. It will also provide a feature to make a shareable interface so that more than one person of an organization can work on the same badge at the same time.


## How does it work

For instance, suppose a contributor “X” has been quite active within the community by working on various PRs, opening and resolving various issues, active on chat channels but after a month “X” gets disappeared. So by using this dashboard they will have a badge interface. There will be a badge attached in front of the name of the contributor. Let the name of the badge be “Y” so this badge will have a unique color. So as the time passes like “ a day went, 1 week went, 2 weeks went, a month, etc) this badges will get keep on fading. And Every fade color will have a unique reason. For example, when a contributor made a PR, the badge appeared “Red” in color. This badge will remain in the same color as long as he/she is contributing. Assume that contributor stops contributing and has not contributed for a week so his badge will become green in color. And this will keep on notifying mainaters, Admins about their disappearing. This way the organisations will have greater eye on the contributors and can help them sustain with the community.

## Setting up the project
To set up the project, carry out the following steps:

**Step 1:-** fork the repository

**Step 2:-** clone the repository

``` git clone https://github.com/username/Codebadge.git ``` 

- Remember to replace "username" with your github username in the link

- Create an [oAuth](https://github.com/settings/developers) application if you haven't already

- Make sure that the callback-url is set to `http://localhost:8080/#/auth`

- Make an `.env` file in the root folder of the project (where package.json is)

- Add the code given below and replace it with values from your oAuth application:
```
VUE_APP_CLIENT_ID=<client id>
VUE_APP_CLIENT_SECRET=<client secret>
```
**Step 3:-** install frontend dependencies and run frontend server
``` npm install && npm run serve```

**Step 4:-** install flask api dependencies and run api
``` 
cd backend
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
FLASK_APP=run.py flask run
```

## Stack used

This will have a dashboard, where these things can be placed. The stack used can be any but since the organisation have fixed stack so its better to stick to Nodejs, Vue, Flask.

## Benefits to the community

Different communities or programs like “GirlScript Summer of Code, Codeheat, GSOC, etc would be able to track their contributors and this project will help them by not losing potential contributors and select the best from all potential candidates.

## Contributions Best Practices

**Commits**

- Write clear meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/)
- Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
- When you make very very minor changes to a PR of yours (like for example fixing a failing Travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterward so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
- When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.

## Community

All feedback and suggestions are welcome!

- 💬 Join the community on [Slack](https://join.slack.com/t/codeuino/shared_invite/enQtMzcxOTQwNzE4NzcxLWEyNzUxYjI0ZThiNWUyYWI5MzJlMTNmODMxN2NjMTcxODJkZmFhNTVkYmUyOTQ1YzgzNTlmMTVkYzVhMzdmNTQ)
- 📣 Stay up to date on new features and announcements on the following
  - [@Mailing List](codeuino-devel@googlegroups.com).
  - [@Discussion Portal](https://groups.google.com/d/forum/codeuino-devel).
  - [@Codeuino Wiki](wiki.codeuino.org).
