var Metalsmith = require('metalsmith')
var Markdown = require('metalsmith-markdown')
var Layouts = require('metalsmith-layouts')

Metalsmith(__dirname)
  .use(Markdown())
  .use(Layouts({
    engine: 'handlebars'
  }))
  .build(function(err) {
    if (err) throw err
  })
