require("assert-dotenv")({}, function() {
  "use strict";

  const Slack = require("slack-node");
  const Npm = require("npm-publish-stream");
  const NpmSlack = require("./src/npm-slack");
  require("datejs");

  const slack = new Slack();
  slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

  const startTime = process.env.START_TIME ?
    Date.parse(process.env.START_TIME) :
    new Date();
  const refreshRate = process.env.REFRESH_RATE || 30000;

  const npm = new Npm({startTime: startTime, refreshRate: refreshRate});

  new NpmSlack({
    npm: npm,
    slack: slack,
    npmPackages: process.env.NPM_PACKAGES.split(","),
    slackParams: {channel: process.env.SLACK_CHANNEL}
  });
});
