require("assert-dotenv")({}, function() {
  "use strict";

  var Slack = require("slack-node");
  var Npm = require("npm-publish-stream");
  var NpmSlack = require("./src/npm-slack");
  require("datejs");

  var slack = new Slack();
  slack.setWebHook(process.env.SLACK_WEBHOOK_URL);

  var startTime = process.env.START_TIME ?
    Date.parse(process.env.START_TIME) :
    new Date();
  var refreshRate = process.env.REFRESH_RATE || 30000;

  var npm = new Npm({startTime: startTime, refreshRate: refreshRate});

  new NpmSlack({
    npm: npm,
    slack: slack,
    npmPackages: process.env.NPM_PACKAGES.split(","),
    slackParams: {channel: process.env.SLACK_CHANNEL}
  });
});
