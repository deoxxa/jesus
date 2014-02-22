Jesus
=====

Resurrect processes if they die.

Overview
--------

Jesus is a simple-ish process management tool. It's designed to be very light,
while still providing functions enough to be automated if necessary. To that
end, it only runs a single process to monitor all your stuff. It can be exposed
via a unix socket (default) or an actual network interface for automation.

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install jesus -g

Or via git:

> $ npm install git://github.com/deoxxa/jesus.git -g

Usage
-----

```
Usage: jesus <action> [options]

  The `action' portion of the command is case-insensitive

Actions:

  help
    you're looking at it!

  listen [file]
    start jesus supervisor, writing output to `file' if specified,
    otherwise stdout (console)

  daemon [file]
    same as above, but put the listening process in the background

  start <process name> [command ...]
    start a process

  stop <process name>
    stop a process by name

  stopAll
    stop all processes

  restart <process name>
    restart a process by name

  restartAll
    restart all processes

  check <process name>
    check the status of a process by name

  list
    check the status of all processes
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
