const EventEmitter = require('events').EventEmitter
const format = require('util').format
const mqtt = require('mqtt')

class Relay extends EventEmitter {
  constructor (url, options = {}) {
    super()

    this._url = url
    this._options = options
    this._pubSubClient = null
    this._ready = false

    this._createClient()
  }

  _createClient () {
    this._pubSubClient = mqtt.connect(this._url, this._options)

    // Add event listeners
    this._pubSubClient.on('connect', () => this._onPubSubClientReady())
    this._pubSubClient.on('message', (channel, message) => this._onPubSubClientMessage(channel, message))
    this._pubSubClient.on('error', () => this._onPubSubClientError())
    this._pubSubClient.on('end', () => this._onPubSubClientEnd())
  }

  _onPubSubClientReady () {
    this._ready = true
  }

  _onPubSubClientMessage (channel, message) {
    if (channel.indexOf('peers:') !== -1) {
      const peerId = channel.split(':')[1]
      this.emit('message', peerId, message)
    }
  }

  _onPubSubClientError () {
    // TODO: handle error
  }

   _onPubSubClientEnd () {
     this._ready = false
   }

  addLocalPeerId (peerId) {
    return new Promise((resolve, reject) => {
      if (!this._ready) return reject(new Error('relay not ready'))
      this._pubSubClient.subscribe(format('peers:%d', peerId))
      return resolve()
    })
  }

  removeLocalPeerId (peerId) {
    return new Promise((resolve, reject) => {
      if (!this._ready) return reject(new Error('relay not ready'))
      this._pubSubClient.unsubscribe(format('peers:%d', peerId))
      return resolve()
    })
  }

  relay (peerId, data) {
    this._pubSubClient.publish(format('peers:%d', peerId), data)
  }
}

exports = module.exports = Relay
