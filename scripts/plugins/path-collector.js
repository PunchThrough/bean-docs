'use strict'

let pluralize = require('pluralize')

module.exports = config => {
  return (files, metalsmith, done) => {
    let count = Object.keys(files).length
    if (config.debug) {
      console.log('Generating collections for ' + count + ' ' + pluralize('file', count))
    }

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

    // Permanent sidebar links for all subpages of /example-projects/ [WORKING]
    let projects = config.projects
    let projectCollections = []
    projects.forEach((coll) => {
      projectCollections.push({key: coll.key, name: coll.name, pages: []})
      //console.log("projectCollection: " + coll.name)
    })

    // Permanent sidebar links for all subpages of /guides/ [WORKING]
    let guides = config.guides
    let guideCollections = []
    guides.forEach((coll) => {
      guideCollections.push({key: coll.key, name: coll.name, pages: []})
      //console.log("guidesCollection: " + coll.name)
    })

    // If files are in guides or example-projects
    Object.keys(files).forEach((filePath) => {
      if (filePath.includes("guides")) {
        console.log("GUIDES: " + filePath + " in " + Object.directory)
        let data = files[filePath]
        guides.forEach((coll, index) => {
          let collRegex = new RegExp(coll.pattern)
          if (collRegex.test(filePath)) {
            guideCollections[index].pages.push(data)
            // Each file should be aware of the collection it's in
            files[filePath].coll_key = coll.key
          }
        })
      }
      else if (filePath.includes("example-projects")) {
        console.log("PROJECTS: " + filePath + " in " + Object.directory)
        let data = files[filePath]
        projects.forEach((coll, index) => {
          let collRegex = new RegExp(coll.pattern)
          if (collRegex.test(filePath)) {
            projectCollections[index].pages.push(data)
            // Each file should be aware of the collection it's in
            files[filePath].coll_key = coll.key
          }
        })
      }
    })

    console.log("SORTING THE GUIDES SUBDIRECTORY PATHS")
    // Sort all pages by their "order" property, if it exists
    guideCollections.forEach((coll) => {
      coll.pages = coll.pages.sort(pageOrder)
    })
    
    console.log("SORTING THE PROJECTS SUBDIRECTORY PATHS\n")
    // Sort all pages by their "order" property, if it exists
    projectCollections.forEach((coll) => {
      coll.pages = coll.pages.sort(pageOrder)
    })

    // Store in Metalsmith global object
    metalsmith.collections = guideCollections + projectCollections
    // Store in each File for local access
    Object.keys(files).forEach((filePath) => {
      if (filePath.includes("guides")) {
      	files[filePath].collections = guideCollections
      	//console.log("Put " + filePath + " in guideCollections")
      }
      else if (filePath.includes("projects")) {
      	files[filePath].collections = projectCollections
      	//console.log("Put " + filePath + " in projectCollections")
      }
    })
    
	console.log("There were " + count + ' ' + pluralize('file', count))
    done()
  }
}
