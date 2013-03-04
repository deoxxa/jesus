var events = require("events"),
    spawn = require("child_process").spawn,
    stream = require("stream"),
    util = require("util");

var Jesus = module.exports = function Jesus() {
  events.EventEmitter.call(this);

  this.processes = {};
};
util.inherits(Jesus, events.EventEmitter);

Jesus.prototype.openLog = function openLog(id, channel) {
  var s = new stream.Transform();

  var buffer = "";
  s._transform = function(input, respond, done) {
    buffer += input;

    var lines = buffer.split("\n");
    buffer = lines.pop();

    lines.forEach(function(line) {
      respond([id, channel, line].join(":") + "\n");
    });

    return done();
  };

  s.pipe(process.stdout);

  return s;
};

Jesus.prototype.check = function check(id) {
  if (!this.processes[id]) {
    return null;
  }

  return this.processes[id];
};

Jesus.prototype.start = function start(args, options) {
  if (typeof options !== "object" || options === null) { options = {}; }

  if (typeof options.id !== "string") {
    options.id = [0,0,0,0].map(function(e) { return String.fromCharCode((Math.random() * 25) + 65); }).join("");
  }

  if (typeof args === "string") {
    args = [args];
  }

  if (!this.processes[options.id]) {
    var onExit = function onExit(code) {
      this.emit("processExited", {id: options.id, status: code});
      setImmediate(this.start.bind(this, args, options));
    }.bind(this);

    this.processes[options.id] = {
      id: options.id,
      args: args,
      cwd: options.cwd,
      started: [],
      onExit: onExit,
      process: null,
    };
  }

  this.processes[options.id].started.push((new Date()).toISOString());

  var child = this.processes[options.id].process = spawn(args[0], args.slice(1), {cwd: options.cwd});

  child.stdout.pipe(this.openLog(options.id, "out"));
  child.stderr.pipe(this.openLog(options.id, "err"));

  child.on("exit", this.processes[options.id].onExit);

  child.on("error", function onError(err) {
    this.emit("processError", {id: options.id, pid: child.pid, args: args, error: err});
  });

  this.emit("processStarted", {id: options.id, pid: child.pid, args: args});

  return this.processes[options.id];
};

Jesus.prototype.stop = function stop(id) {
  if (!this.processes[id]) {
    return;
  }

  this.processes[id].process.removeListener("exit", this.processes[id].onExit);
  this.processes[id].process.addListener("exit", function(code) {
    this.emit("processTerminated", {id: id, status: code});
  }.bind(this));

  this.processes[id].process.kill();

  delete this.processes[id];
};

Jesus.prototype.stopAll = function restartAll() {
  Object.keys(this.processes).map(function(k) { return this.processes[k]; }.bind(this)).forEach(function(e) {
    e.process.removeListener("exit", e.onExit);
    e.process.addListener("exit", function(code) {
      this.emit("processTerminated", {id: id, status: code});
    }.bind(this));

    e.process.kill();
  }.bind(this));
};

Jesus.prototype.restart = function restart(id) {
  if (!this.processes[id]) {
    return;
  }

  this.processes[id].process.kill();
};

Jesus.prototype.restartAll = function restartAll() {
  Object.keys(this.processes).map(function(k) { return this.processes[k]; }.bind(this)).forEach(function(e) {
    e.process.kill();
  });
};
