var burro = require("burro"),
    net = require("net"),
    path = require("path"),
    pillion = require("pillion");

module.exports.connect = function connect(port, host) {
  if (!port && !host) {
    port = path.join(process.env.HOME, ".jesus", "daemon.sock");
  }

  return new pillion(burro.wrap(net.connect(port, host)));
};
