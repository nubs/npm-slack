"use strict";

var _ = require("lodash");

function format(pkg) {
  var name = pkg.id;
  var version = pkg.doc["dist-tags"].latest;
  var link = "https://www.npmjs.org/package/" + name;

  return "Package <" + link + "|" + name + "@" + version + "> published";
}

var NpmSlack = function(opts) {
  this._npm = opts.npm;
  this._slack = opts.slack;
  this._npmPackages = opts.npmPackages;
  this._slackParams = opts.slackParams;
  this._format = opts.format || format;

  this._addNpmHandlers();
};

NpmSlack.prototype._addNpmHandlers = function() {
  // eslint-disable-next-line no-console
  this._npm.on("error", console.error);
  this._npm.on("data", this._handleNpmPackage.bind(this));
};

NpmSlack.prototype._handleNpmPackage = function(pkg) {
  if (!_.includes(this._npmPackages, pkg.id)) {
    return;
  }

  this._sendToSlack(this._format(pkg));
};

NpmSlack.prototype._sendToSlack = function(text) {
  // eslint-disable-next-line no-console
  console.log(text);

  this._slack.webhook(
    _.extend({}, this._slackParams, {text: text}),
    this._handleSlackResponse.bind(this)
  );
};

NpmSlack.prototype._handleSlackResponse = function(error) {
  if (error !== null) {
    // eslint-disable-next-line no-console
    console.error("-- " + error);
  }
};

module.exports = NpmSlack;
