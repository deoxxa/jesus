module.exports = require("./lib/jesus");

var Daemon = module.exports.Daemon = require("./lib/daemon");
var Client = module.exports.Client = require("./lib/client");

module.exports.createServer = function createServer(options) {
  return new Daemon(options);
};

module.exports.connect = function connect(port, host, cb) {
  return Client.connect(port, host, cb);
};
