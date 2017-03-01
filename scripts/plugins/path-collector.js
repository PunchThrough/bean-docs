'use strict'

let pluralize = require('pluralize')


let pageOrder = (a, b) => {
  if (!a.order && !b.order) {
    // Default: sort alphabetically
    // http://stackoverflow.com/a/51169/254187
    // localeCompare with locale and sort options doesn't work with
    // case-insensitivity for some reason
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  }
  // Sort pages with "order" above pages without
  if (!a.order) return 1
  if (!b.order) return -1
  return a.order - b.order
}

let alphabetical = (a, b) => {
  // Alphabetical comparison sorting (projects only)
  // http://stackoverflow.com/a/51169/254187
  return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
}


module.exports = (config) => {

  return (files, metalsmith, done) => {
    let count = Object.keys(files).length
    if (config.debug) {
      console.log('Generating collections for ' + count + ' ' + pluralize('file', count))
    }

    // Permanent sidebar links for all subpages of /projects/
    let projects = config.projects
    let projectCollections = []
    projects.forEach((coll) => {
      projectCollections.push({key: coll.key, name: coll.name, pages: []})
    })

    // Permanent sidebar links for all subpages of /guides/
    let guides = config.guides
    let guideCollections = []
    guides.forEach((coll) => {
      guideCollections.push({key: coll.key, name: coll.name, pages: []})
    })

    // Collect pages that should be in the guides/project nav
    Object.keys(files).forEach((filePath) => {
      if (filePath.endsWith('index.md'))
        return

      let data = files[filePath]
      guides.forEach((guideCollection, index) => {
        let collRegex = new RegExp(guideCollection.pattern)
        if (collRegex.test(filePath)) {
          guideCollections[index].pages.push(data)
          // Each file should be aware of the collection it's in
          files[filePath].coll_key = guideCollection.key
        }
      })
      projects.forEach((projectCollection, index) => {
        let collRegex = new RegExp(projectCollection.pattern)
        if (collRegex.test(filePath)) {
          projectCollections[index].pages.push(data)
          // Each file should be aware of the collection it's in
          files[filePath].coll_key = projectCollection.key
        }
      })
    })

    // Sort all pages by their "order" property, if it exists
    guideCollections.forEach((coll) => {
      coll.pages = coll.pages.sort(pageOrder)
    })

    projectCollections.forEach((coll) => {
      coll.pages = coll.pages.sort(alphabetical)
    })

    // Store in Metalsmith global object
    metalsmith.collections = guideCollections + projectCollections

    // Store in each File for local access
    Object.keys(files).forEach((filePath) => {
      if (filePath.includes('guides')) {
        files[filePath].collections = guideCollections
      } else if (filePath.includes('projects')) {
        files[filePath].collections = projectCollections
      }
    })

    done()
  }
}
