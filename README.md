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

> $ npm install jesus

Or via git:

> $ git clone git://github.com/deoxxa/jesus.git node_modules/jesus

Usage
-----

Also see [example.js](https://github.com/deoxxa/jesus/blob/master/example.js).

_To start a monitoring server_

`user@host:~$ jesus listen [where]`

Where `where` is a socket location or a host/port. By default, it'll listen in
`~/.jesus/daemon.sock`. Note that it will not daemonise on its own - you'll have
to take care of that for now. I run it via upstart.

_Example:_

`user@host:~$ jesus listen`

_To start a process_

`user@host:~$ jesus start <id> [argument1 [argument2 ...]]`

`id` is a string. It tells Jesus how to identify your process to you. The
`argument` bits are basically just the rest of your command.

_Example:_

`user@host:~$ jesus start nc.1 nc -l -p 8001`

_To stop a process_

`user@host:~$ jesus stop <id>`

Pretty simple. Does what it says on the tin.

_To restart a process_

`user@host:~$ jesus restart <id>`

Same as `stop` for the most part. Self-explanatory.

_To list processes_

`user@host:~$ jesus list`

This'll give you a nice list of processes that are running, and some limited
statistics.

_To restart all processes_

`user@host:~$ jesus restartall`

Restarts everything that's running.

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
