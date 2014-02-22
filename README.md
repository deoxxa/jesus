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
usage: jesus [-h] [-v]
             {listen,daemon,start,stop,stopall,restart,restartall,check,list}
             ...

Resurrect processes if they die

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.

Actions:
  {listen,daemon,start,stop,stopall,restart,restartall,check,list}
```

Commands
--------

### listen

```
usage: jesus listen [-h] [-H HOST] [-p PORT] [-s SOCKET] [-b BASE_PATH]
                    [-l LOG]


Start jesus listening

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -b BASE_PATH, --base-path BASE_PATH
  -l LOG, --log LOG
```

### daemon

```
usage: jesus daemon [-h] [-H HOST] [-p PORT] [-s SOCKET] [-b BASE_PATH]
                    [-l LOG]


Start jesus listening and daemonise

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -b BASE_PATH, --base-path BASE_PATH
  -l LOG, --log LOG
```

### start

```
usage: jesus start [-h] [-H HOST] [-p PORT] [-s SOCKET] [-n NAME]
                   [-f {text,json}]
                   ...

Start a process

Positional arguments:
  command               command to run and supervise

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -n NAME, --name NAME
  -f {text,json}, --format {text,json}
```

### stop

```
usage: jesus stop [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}] name

Stop a process by name

Positional arguments:
  name

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

### stopall

```
usage: jesus stopall [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}]

Stop all processes

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

### restart

```
usage: jesus restart [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}]
                     name

Restart a process by name

Positional arguments:
  name

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

### restartall

```
usage: jesus restartall [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}]

Restart all processes

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

### check

```
usage: jesus check [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}]

Check the status of a process

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

### list

```
usage: jesus list [-h] [-H HOST] [-p PORT] [-s SOCKET] [-f {text,json}]

List all processes

Optional arguments:
  -h, --help            Show this help message and exit.
  -H HOST, --host HOST
  -p PORT, --port PORT
  -s SOCKET, --socket SOCKET
  -f {text,json}, --format {text,json}
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
