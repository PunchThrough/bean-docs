'use strict'

let core = require('./core')
let Rimraf = require('rimraf')

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

console.log('Deleting old build files')
Rimraf('build', onClear)
