var burro = require("burro"),
    net = require("net"),
    path = require("path"),
    pillion = require("pillion");

module.exports.connect = function connect(port, host) {
  if (!port && !host) {
    port = path.join(process.env.HOME, ".jesus", "daemon.sock");
  }

  var transport = burro.wrap(net.connect(port, host));
  var rpc = new pillion(transport);

  transport.on("error", function(err) {
    rpc.emit("error", err);
  });

  return rpc;
};
