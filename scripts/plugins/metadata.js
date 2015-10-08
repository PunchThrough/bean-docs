// Add arbitrary metadata to Metalsmith.
// See https://github.com/segmentio/metalsmith-metadata

export default (opts) => {
  opts = opts || {}

  return (files, metalsmith, done) => {
    let metadata = metalsmith.metadata()

    for (let key in opts) {
      metadata[key] = opts[key]
    }

    done()
  }
}
