import pluralize from 'pluralize'

export default (config) => {
  return (files, metalsmith, done) => {

    let count = Object.keys(files).length
    console.log('Generating collections for ' + count + ' ' + pluralize('file', count))

    let collections = []
    config.forEach((coll) => {
      collections.push({key: coll.key, name: coll.name, pages: []})
    })

    Object.keys(files).forEach((filePath) => {
      let data = files[filePath]

      config.forEach((coll, index) => {
        let collRegex = new RegExp(coll.pattern)
        if (collRegex.test(filePath)) {
          collections[index].pages.push(data)
          // Each file should be aware of the collection it's in
          files[filePath].coll_key = coll.key
        }
      })
    })

    // Store in Metalsmith global object
    metalsmith.collections = collections
    // Store in each File for local access
    Object.keys(files).forEach((filePath) => {
      files[filePath].collections = collections
    })
    done()
  }
}
