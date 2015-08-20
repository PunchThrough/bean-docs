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
