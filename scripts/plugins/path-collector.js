import pluralize from 'pluralize'

export default (config) => {
  return (files, metalsmith, done) => {

    let count = Object.keys(files).length
    if (config.debug) {
      console.log('Generating collections for ' + count + ' ' + pluralize('file', count))      
    }

    let groups = config.groups
    let collections = []
    groups.forEach((coll) => {
      collections.push({key: coll.key, name: coll.name, pages: []})
    })

    Object.keys(files).forEach((filePath) => {
      let data = files[filePath]

      groups.forEach((coll, index) => {
        let collRegex = new RegExp(coll.pattern)
        if (collRegex.test(filePath)) {
          collections[index].pages.push(data)
          // Each file should be aware of the collection it's in
          files[filePath].coll_key = coll.key
        }
      })
    })

    let pageOrder = (a, b) => {
      if (!a.order && !b.order) return 0
      if (!a.order) return -1
      if (!b.order) return 1
      return a.order - b.order
    }

    // Sort all pages by their "order" property, if it exists
    collections.forEach((coll) => {
      coll.pages = coll.pages.sort(pageOrder)
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
