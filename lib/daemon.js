var burro = require("burro"),
    fs = require("fs"),
    net = require("net"),
    path = require("path"),
    Pillion = require("pillion"),
    stream = require("stream"),
    util = require("util");

var Jesus = require("./jesus");

var Daemon = module.exports = function Daemon(options) {
  net.Server.call(this);

  if (!options) { options = {}; }

  this.basepath = options.basepath || path.join(process.env.HOME, ".jesus");

  try {
    var stat = fs.statSync(this.basepath);

    if (!stat.isDirectory()) {
      throw new Error("basepath (" + this.basepath + ") should be a directory");
    }
  } catch (e) {
    fs.mkdirSync(this.basepath)
  }

  this.jesus = new Jesus();

  this.jesus.openLog = function openLog(id, channel) {
    return fs.createWriteStream(path.join(this.basepath, ["log", id, channel].join(".")), {flags: "a"});
  }.bind(this);

  this.stream = new stream.Readable();
  this.stream._read = function _read(n, respond) {};

  ["processStarted", "processExited", "processError"].forEach(function(event) {
    this.jesus.on(event, function(info) {
      this.stream.push({type: event, info: info});
    }.bind(this));
  }.bind(this));

  this.on("connection", function(_client) {
    var client = burro.wrap(_client),
        rpc = new Pillion();

    rpc.pipe(client).pipe(rpc);

    rpc.provide("start", function start(args, options, cb) {
      var p = this.jesus.start(args, options);

      cb(null, {
        id: p.id,
        pid: p.process.pid,
        args: p.args,
        cwd: p.cwd,
        started: p.started,
      });
    }.bind(this));

    rpc.provide("stop", function stop(id, cb) {
      var p = this.jesus.check(id);

      if (!p) {
        cb(Error("no process with that id found"));
      }

      this.jesus.stop(id);

      cb(null, {
        id: p.id,
        pid: p.process.pid,
        args: p.args,
        cwd: p.cwd,
        started: p.started,
      });
    }.bind(this));

    rpc.provide("restart", function restart(id, cb) {
      var p = this.jesus.check(id);

      if (!p) {
        cb(Error("no process with that id found"));
      }

      this.jesus.restart(id);

      cb(null, {
        id: p.id,
        pid: p.process.pid,
        args: p.args,
        cwd: p.cwd,
        started: p.started,
      });
    }.bind(this));

    rpc.provide("restartAll", function restartAll(cb) {
      this.jesus.restartAll();

      setImmediate(function() {
        cb(null, Object.keys(this.jesus.processes).map(function(e) { return this.jesus.processes[e]; }.bind(this)).map(function(e) {
          return {
            id: e.id,
            pid: e.process.pid,
            args: e.args,
            cwd: e.cwd,
            started: e.started,
          };
        }));
      }.bind(this));
    }.bind(this));

    rpc.provide("list", function list(cb) {
      cb(null, Object.keys(this.jesus.processes).map(function(e) { return this.jesus.processes[e]; }.bind(this)).map(function(e) {
        return {
          id: e.id,
          pid: e.process.pid,
          args: e.args,
          cwd: e.cwd,
          started: e.started,
        };
      }));
    }.bind(this));

    rpc.provide("monitor", function monitor() {
      this.stream.pipe(client);
    }.bind(this));

    rpc.provide("unmonitor", function unmonitor() {
      this.stream.unpipe(client);
    }.bind(this));

    this.emit("clientConnected");

    _client.on("close", function() {
      this.emit("clientDisconnected");
    }.bind(this));
  }.bind(this));
};
util.inherits(Daemon, net.Server);

Daemon.prototype.listen = function listen(port, host) {
  if (!port && !host) {
    port = path.join(this.basepath, "daemon.sock");
  }

  if (typeof port === "string") {
    try { fs.unlinkSync(port); } catch (e) {}
  }

  return net.Server.prototype.listen.call(this, port, host);
};
