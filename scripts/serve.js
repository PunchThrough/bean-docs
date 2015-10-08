import Yaml from 'js-yaml'
import fs from 'fs'

import Serve from 'metalsmith-serve'
import Watch from 'metalsmith-watch'
import core from './core'

const config = Yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))

export default function() {
  core
  .use(Serve())
  .use(Watch(config.watch))
  .build(function(err) {
    if (err) throw err
  })
}
