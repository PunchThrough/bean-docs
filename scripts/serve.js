'use strict'

let Yaml = require('js-yaml')
let fs = require('fs')

let Serve = require('metalsmith-serve')
let Watch = require('metalsmith-watch')
let core = require('./core')

const config = Yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))

core
.use(Serve())
.use(Watch(config.watch))
.build(function (err) {
  if (err) throw err
})
