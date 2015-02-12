require('assert-dotenv')({}, function() {
  'use strict';

  var Slack = require('slack-node');
  var Npm = require('npm-publish-stream');
  var NpmSlack = require('./src/npm-slack');

  var slack = new Slack();
  slack.setWebHook(process.env.SLACK_WEBHOOK_URL);

  var npm = new Npm({startTime: new Date()});

  var npmSlack = new NpmSlack({
    npm: npm,
    slack: slack,
    npmPackages: process.env.NPM_PACKAGES.split(','),
    slackChannel: process.env.SLACK_CHANNEL
  });
});
