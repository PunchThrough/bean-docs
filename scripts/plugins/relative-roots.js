export default (config) => {
  return (files, metalsmith, done) => {

    // Add relative links to home to each page
    // i.e. files/something/doc.md -> '../../',
    //      files/other_doc.md -> '../'
    // This way, files can use relative links because they "know" how deep they
    // are in the filesystem
    Object.keys(files).forEach((filePath) => {
      let levelsDeep = filePath.split('/').length - 1
      if (config.fixPermalinks) {
        // Permalinks moves dir/file.md into dir/file/index.html.
        // This messes up our relative linking for the files that are moved.
        // Add another depth level for HTML files that aren't already index.md.
        if (!filePath.endsWith(config.indexFilename)) levelsDeep++
      }
      if (config.debug) {
        console.log(levelsDeep, filePath)
      }
      files[filePath].relativeRoot = '../'.repeat(levelsDeep)
    })

    done()
  }
}
