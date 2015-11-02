'use strict'

// Add arbitrary metadata to Metalsmith.
// See https://github.com/segmentio/metalsmith-metadata

module.exports = opts => {
  opts = opts || {}

  return (files, metalsmith, done) => {
    let metadata = metalsmith.metadata()

    for (let key in opts) {
      metadata[key] = opts[key]
    }

    done()
  }
}
