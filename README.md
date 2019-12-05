# About Codebadge

[![Online Status](https://img.shields.io/website/http/prabhani.me/Codebadge.svg?down_message=offline&up_message=online)](http://prabhani.me/Codebadge)
[![Build Status](https://travis-ci.com/PrabhaniN/Codebadge.svg?branch=master)](https://travis-ci.com/PrabhaniN/Codebadge)
![Language Count](https://img.shields.io/github/languages/count/PrabhaniN/codebadge.svg)
[![License](https://img.shields.io/github/license/PrabhaniN/codebadge.svg)](https://github.com/PrabhaniN/Codebadge/blob/master/LICENSE)

Oftentimes a project maintainer is unable to manage all of the activity on their own. This project is about tracking the contributor.

### Features

- Easy to monitor the activities of various contributors.
- Visibility of top contributors in various projects.
- Real time tracking of commits, PR's and other contributions.
- Contributors list based on number of PR's, merged pulls and other activities.
- Contribution history of each contributor.

The other part of this project includes the “notifying moderator” since we see sometimes that there are many PRs being sent, or issues being opened by various people across the globe but there are limited numbers of maintainers merging the PRs. This way organizations usually lose their potential contributors due to following things:

- Their PRs are not being merged
- Contributors finding difficulty in understanding the issue
- They could not reach to expectation
  So this will help the maintainers get notified when they see these people inactive.

## How does it work

For instance, suppose a contributor “X” has been quite active within the community by working on various PRs, opening and resolving various issues, active on chat channels but after a month “X” gets disappeared. So by using this dashboard they will have a badge interface. There will be a badge attached in front of the name of the contributor. This badge will have a unique color so as time passes (a day, 1 week, 2 weeks, a month, etc) this badges will keep on fading. Every fade color will have a unique reason. For example, when a contributor made a PR, the badge appeared “Red” in color. This badge will remain in the same color as long as he/she is contributing. If that contributor stops contributing and has not contributed for a week so his badge will become green in color. And this will notify maintainers or admins about their disappearance. This way the organizations will have greater eye on the contributors and can help them maintain their community.

## Stack used

Codebadge has a dashboard, where these badges are placed. Any stack could be used but since the organizations have fixed stacks its better to stick with Nodejs, Vue, and React.

## Benefits to the community

Different communities or projects like GirlScript, Summer of Code, Codeheat, GSOC, etc. Will be able to track their contributors and this project will help them not lose potential contributors and select the best from all potential candidates.

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
