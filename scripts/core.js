import Metalsmith from 'metalsmith'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'
import AutoTOC from 'metalsmith-autotoc'
import Partials from 'metalsmith-register-partials'
import util from 'util'

import Handlebars from 'handlebars'

const config = {
  src: '../src',
  dest: '../build',
  layouts: {
    engine: 'handlebars',
    directory: '../templates/layouts'
  },
  partials: {
    directory: '../templates/partials'
  },
  autotoc: {
    selector: 'h2, h3'
  }
}

function Debugger() {
  return (files) => {
    Object.keys(files).forEach(file => {
      let data = files[file]
      console.log(file)
      console.log(util.inspect(data, {depth: 5}))
    })
  }
}

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Handlebars context:')
  console.log('===========================')
  console.log(util.inspect(this))
})

export default Metalsmith(__dirname)
  .source(config.src)
  .destination(config.dest)
  .use(Markdown())
  .use(AutoTOC(config.autotoc))
  .use(Debugger())
  .use(Partials(config.partials))
  .use(Layouts(config.layouts))
