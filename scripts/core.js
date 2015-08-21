import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'

import PathCollector from './plugins/path-collector'
import Debugger from './plugins/debugger'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'
import AutoTOC from 'metalsmith-autotoc'
import Partials from 'metalsmith-register-partials'
import Permalinks from 'metalsmith-permalinks'
import Ignore from 'metalsmith-ignore'


const config = {
  src: '../src',
  dest: '../build',
  ignore: '**/.DS_Store',
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
      key: 'enim_ut',
      name: 'Enim ut Placeat',
      pattern: '^enim_ut/.+.md$',
    },
    {
      key: 'laudantium',
      name: 'Laudantium Ratione',
      pattern: '^laudantium/.+.md$',
    },
    {
      key: 'natus_nihil',
      name: 'Natus Nihil',
      pattern: '^natus_nihil/.+.md$',
    },
    {
      key: 'qui',
      name: 'Qui Reprehenderit',
      pattern: '^qui/.+.md+$'
    },
  ],
  permalinks: {
    pattern: ':coll_key/:id'
  },
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
  .use(Ignore(config.ignore))
  .use(PathCollector(config.pathCollector))
  .use(Markdown())
  .use(AutoTOC(config.autotoc))
  .use(Permalinks(config.permalinks))
  .use(Debugger())
  .use(Partials(config.partials))
  .use(Layouts(config.layouts))
