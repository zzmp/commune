commune
=======

The intranet's microphone.

---

## What is it?

### A lecture tool

Commune let's participants queue up to ask questions. When the presenter is ready, the queued questions can be streamed through a host client using participants' own computers' microphone.

---

## Why is it?

Lecturers and participants alike need to hear questions, and microphones can be hard to come by. After one too many dead batteries, commune is here to give a voice to the people.

---

## How is it?

Commune works on a MEAN stack, with sockets and some native APIs:

* **M**ongoDB to store rooms
* **E**xpress server
* **A**ngular front-end
* **N**ode.js to pull it all together
* Socket.io for requests and streaming
* Web Audio and getUserMedia APIs to capture and manipulate user audio

---

## Use

1. `npm install` and `bower install`

2. Have a mongod up and running. If `DB_URL` is set on your environment, the database will be looked for there, otherwise, it will default to `mongodb://localhost/commune`

3. Kick off your server with either `node server/server.js` or `gulp serve` (to use `nodemon`) 

4. Find your IP by typing `ifconfig` in the terminal. Port 9000 is used by default.

* *Note that latency tends to be unbearable on the internet - this app is best suited for your intranet*

---

Made by Zach Pomerantz as part of [Hack Reactor](http://www.hackreactor.com/)
http://github.com/zzmp/commune
