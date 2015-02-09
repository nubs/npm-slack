require('assert-dotenv')({}, function() {
  'use strict';

  var Slack = require('slack-node');
  var Npm = require('npm-publish-stream');
  var _ = require('lodash');

  var slack = new Slack();
  slack.setWebHook(process.env.SLACK_WEBHOOK_URL);
  var channel = process.env.SLACK_CHANNEL;

  var npm = new Npm({startTime: new Date()});
  var packages = process.env.NPM_PACKAGES.split(',');

  npm.on('error', console.error);

  npm.on('data', function(pkg) {
    var name = pkg.id;
    if (!_.contains(packages, name)) {
      return;
    }

    var version = pkg.doc['dist-tags'].latest;
    var link = 'https://www.npmjs.org/package/' + name;
    var text = 'Package <' + link + '|' + name + '@' + version + '> published';

    slack.webhook({channel: channel, text: text}, function(error, response) {
      console.log(text);

      if (error !== null) {
        console.error('-- ' + error);
      } else {
        console.log('-- ' + response.statusCode);
      }
    });
  });
});
