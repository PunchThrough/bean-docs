import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import Yaml from 'js-yaml'
import fs from 'fs'

import PathCollector from './plugins/path-collector'
import Debugger from './plugins/debugger'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'
import AutoTOC from 'metalsmith-autotoc'
import Helpers from 'metalsmith-register-helpers'
import Partials from 'metalsmith-register-partials'
import Permalinks from 'metalsmith-permalinks'
import Ignore from 'metalsmith-ignore'

const config = Yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))

export default Metalsmith(__dirname)
  .source(config.src)
  .destination(config.dest)
  .use(Ignore(config.ignore))
  .use(PathCollector(config.pathCollector))
  .use(Markdown())
  .use(AutoTOC(config.autotoc))
  .use(Permalinks(config.permalinks))
  //.use(Debugger())
  .use(Helpers(config.helpers))
  .use(Partials(config.partials))
  .use(Layouts(config.layouts))
