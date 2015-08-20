import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'

import PathCollector from './plugins/path-collector'
import Debugger from './plugins/debugger'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'
import AutoTOC from 'metalsmith-autotoc'
import Partials from 'metalsmith-register-partials'
import Path from 'metalsmith-path'


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
  },
  pathCollector: [
    {
      key: 'guides-enim',
      name: 'Enim ut Placeat',
      pattern: '^guides/enim.+$',
    },
    {
      key: 'guides-laud',
      name: 'Laudantium Ratione',
      pattern: '^guides/laud.+$',
    },
    {
      key: 'guides-natus',
      name: 'Natus Nihil',
      pattern: '^guides/natus.+$',
    },
    {
      key: 'guides-qui',
      name: 'Qui Reprehenderit',
      pattern: '^guides/qui.+$'
    },
  ]
}

Handlebars.registerHelper('debug', (thing) => {
  console.log('===== START =====')
  console.log(thing)
  console.log('===== END =====\n\n')
})

Handlebars.registerHelper('titleize', (text) => {
  return 'Titleized: ' + text
})

export default Metalsmith(__dirname)
  .source(config.src)
  .destination(config.dest)
  .use(PathCollector(config.pathCollector))
  .use(Markdown())
  // .use(Debugger())
  .use(AutoTOC(config.autotoc))
  .use(Path())
  .use(Partials(config.partials))
  .use(Layouts(config.layouts))
