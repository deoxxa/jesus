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

Also see [example.js](https://github.com/deoxxa/jesus/blob/master/example.js).

_To start a monitoring server_

`user@host:~$ jesus listen [log]`

Where `log` is a file location for logging. If not supplied, logging will go to
stdout by default. Note that `listen` does not daemonise the process. You should
use `daemon` in place of `listen` to do that.

_Example:_

`user@host:~$ jesus listen`

OR

`user@host:~$ jesus listen ~/.jesus/jesus.log`

OR

`user@host:~$ jesus daemon ~/.jesus/jesus.log`

_To start a process_

`user@host:~$ jesus start <id> [argument1 [argument2 ...]]`

`id` is a string. It tells Jesus how to identify your process to you. The
`argument` bits are basically just the rest of your command.

_Example:_

`user@host:~$ jesus start nc.1 nc -l -p 8001`

_To stop a process_

`user@host:~$ jesus stop <id>`

Pretty simple. Does what it says on the tin.

_To stop all processes_

`user@host:~$ jesus stopall`

Stops everything that's running.

_To restart a process_

`user@host:~$ jesus restart <id>`

Same as `stop` for the most part. Self-explanatory.

_To restart all processes_

`user@host:~$ jesus restartall`

Much the same as `stopall`, but does a restart instead.

_To list processes_

`user@host:~$ jesus list`

This'll give you a nice list of processes that are running, and some limited
statistics.

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
