import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import Yaml from 'js-yaml'
import fs from 'fs'

import Metadata from './plugins/metadata'
import PathCollector from './plugins/path-collector'
import RelativeRoots from './plugins/relative-roots'
import Debugger from './plugins/debugger'

import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'
import AutoTOC from 'metalsmith-autotoc'
import Helpers from 'metalsmith-register-helpers'
import Partials from 'metalsmith-register-partials'
import Permalinks from 'metalsmith-permalinks'
import Ignore from 'metalsmith-ignore'
import Stylus from 'metalsmith-stylus'
import InPlace from 'metalsmith-in-place'
import Paths from 'metalsmith-paths'

const config = Yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))

export default Metalsmith(__dirname)
  .source(config.src)
  .destination(config.dest)
  .use(Metadata({config: config}))
  .use(PathCollector(config.pathCollector))
  .use(Paths())
  .use(Ignore(config.ignore))
  .use(RelativeRoots(config.relativeRoots))
  .use(Partials(config.partials))
  .use(Helpers(config.helpers))
  .use(InPlace(config.inPlace))
  .use(Markdown())
  .use(Stylus())
  .use(AutoTOC(config.autotoc))
  .use(Permalinks(config.permalinks))
  //.use(Debugger())
  .use(Layouts(config.layouts))
  .use(Redirect(config.redirect))
