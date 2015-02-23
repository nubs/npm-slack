# npm-slack
A slack bot that publishes messages when npm packages are published.

## CLI Usage
The `server.js` script can be run from node.js, but requires three parameters
given by environment variables.
* `NPM_PACKAGES` is a comma-delimited list of npm package names to report on.
* `SLACK_CHANNEL` is the destination channel to report to. (e.g., `#foo`)
* `SLACK_WEBHOOK_URL is the slack-provided incoming webhook url. (create at
  https://slack.com/services/new/incoming-webhook)

For example:

```bash
NPM_PACKAGES=express,koa SLACK_CHANNEL='#general' SLACK_WEBHOOK_URL='...' node server.js
```
