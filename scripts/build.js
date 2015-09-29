import core from './core'
import Rimraf from 'rimraf'
import Yaml from 'js-yaml'
import fs from 'fs'

const config = Yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))

const onClear = (err) => {
  if (err) throw err
  console.log('Starting build')
  core
    // .use(YourPlugin(config.yourPlugin))
    .build(onBuild)
}

const onBuild = (err) => {
  if (err) throw err
  else console.log('Build successful!')
}

export default function() {
  console.log('Deleting old build files')
  Rimraf('build', onClear)
}
