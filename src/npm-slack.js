(function() {
  'use strict';

  var _ = require('lodash');

  var NpmSlack = function(opts) {
    this._npm = opts.npm;
    this._slack = opts.slack;
    this._npmPackages = opts.npmPackages;
    this._slackChannel = opts.slackChannel;

    this._addNpmHandlers();
  };

  NpmSlack.prototype._addNpmHandlers = function() {
    this._npm.on('error', console.error);
    this._npm.on('data', this._handleNpmPackage.bind(this));
  };

  NpmSlack.prototype._handleNpmPackage = function(pkg) {
    var name = pkg.id;
    if (!_.contains(this._npmPackages, name)) {
      return;
    }

    var version = pkg.doc['dist-tags'].latest;
    var link = 'https://www.npmjs.org/package/' + name;
    var text = 'Package <' + link + '|' + name + '@' + version + '> published';
    this._sendToSlack(text);
  };

  NpmSlack.prototype._sendToSlack = function(text) {
    console.log(text);

    this._slack.webhook(
      {channel: this._slackChannel, text: text},
      this._handleSlackResponse.bind(this)
    );
  };

  NpmSlack.prototype._handleSlackResponse = function(error, response) {
    if (error !== null) {
      console.error('-- ' + error);
    } else {
      console.log('-- ' + response.statusCode);
    }
  };

  module.exports = NpmSlack;
})();
