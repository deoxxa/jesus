module.exports = require("./lib/jesus");

var Daemon = module.exports.Daemon = require("./lib/daemon");
var Client = module.exports.Client = require("./lib/client");

module.exports.createServer = function createServer() {
  var daemon = new Daemon();

  return daemon;
};

module.exports.connect = function connect(port, host) {
  return Client.connect(port, host);
};
