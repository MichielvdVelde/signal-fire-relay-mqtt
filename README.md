# WebRTC Signaling Server for node.js

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**Note:** Starting with signal-fire 0.4.0, this relay is deprecated. Use [signal-fire-relay](https://github.com/MichielvdVelde/signal-fire-relay) instead!

**signal-fire-relay-mqtt** is a relay for **[signal-fire](https://github.com/MichielvdVelde/signal-fire)**, a horizontally scalable
signaling server for **WebRTC**. This module can be used as a reference implementation for writing your own relays.

For more information about the actual server module, [see signal-fire](https://github.com/MichielvdVelde/signal-fire).

#### Install

Install using **npm**:

```bash
npm i signal-fire-relay-mqtt --save
```

#### Usage

It's easy to add the relay to **signal-fire**:

```js
const Server = require('signal-fire').Server
const Relay = require('signal-fire-relay-mqtt').Relay

const relay = new Relay('mqtt://broker.hivemq.com', {
  // These options are passed to `mqtt.connect()`
})

// Create a server with the relay set
const server = new Server({
  relay: relay
})
```

That's all!

#### Changelog

* v0.3.0
  * Added deprecation notice. **Starting with signal-fire v0.4.0**, use [signal-fire-relay](https://github.com/MichielvdVelde/signal-fire-relay) instead!
* v0.2.1
  * Fix package naming mixup
* v0.2.0
  * The `error` event on the MQTT connection is now re-emitted
  * Renamed `.relay()` to `.send()` (**breaking change**, only compatible with signal-fire 0.3.0 or higher!)
* v0.1.0
  * Initial release

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

#### License

Copyright 2016 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LiCENSE).
