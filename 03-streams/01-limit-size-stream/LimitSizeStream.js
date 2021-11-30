const stream = require('stream')
const LimitExceededError = require('./LimitExceededError')

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options)
    this.limit = options.limit
    this.results = 0
  }

  _transform(chunk, encoding, callback) {
    this.results += chunk.length
    if (this.results > this.limit) {
      return callback(new LimitExceededError())
    }
    callback(null, chunk)
  }
}

module.exports = LimitSizeStream
