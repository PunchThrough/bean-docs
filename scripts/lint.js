var glob = require('glob')
var yaml = require('js-yaml')
var S = require('string')
var colors = require('colors/safe')
var fs = require('fs')

var config = yaml.load(fs.readFileSync('config.yml', 'utf8'))

files = []
config.lint.files.forEach(function(pattern) {
  files = files.concat(glob.sync(pattern))
})

var rules = config.lint.rules
// add the global flag to every pattern so we can use re.exec() to iterate over all matches
// http://stackoverflow.com/a/5836103/254187
rules.forEach(function(rule) {
  var pattern = rule.pattern
  if (!pattern.global) {
    var flags = 'g'
    if (pattern.ignoreCase) flags += 'i'
    if (pattern.multiline) flags += 'm'
    rule.pattern = RegExp(pattern.source, flags)
  }
})

files.forEach(function(path) {
  var firstError = true
  var all = fs.readFileSync(path, 'utf8')
  var lines = all.split('\n')
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    rules.forEach(function(rule) {
      var results = []
      var result
      while ((result = rule.pattern.exec(line)) !== null) {
        if (firstError) {
          firstError = false
          console.log(colors.black(colors.bgWhite(path)))
          console.log()
        }

        var index = result.index
        var match = result[0]
        var length = match.length
        var highlighted = line.substr(0, index) + colors.white(colors.bold(match)) + line.substr(index + length)

        var loc = S('{{line_num}}:{{col}}').template({
            line_num: i,
            col: index,
          }).s
        var info = S('{{loc}} {{message}}')
          .template({
            loc: colors.red(loc),
            message: colors.green(rule.message),
          }).s
        console.log(info)
        console.log(colors.grey(highlighted))
        console.log()
      }
    })
  }
})
