var glob = require('glob')
var yaml = require('js-yaml')
var colors = require('colors/safe')
var sprintf = require('sprintf-js').sprintf
var fs = require('fs')

var config = yaml.load(fs.readFileSync('config.yml', 'utf8'))

var files = []
config.lint.files.forEach(function (pattern) {
  files = files.concat(glob.sync(pattern))
})

var rules = config.lint.rules
// add the global flag to every pattern so we can use re.exec() to iterate over all matches
// http://stackoverflow.com/a/5836103/254187
rules.forEach(function (rule) {
  var pattern = rule.pattern
  if (!pattern.global) {
    var flags = 'g'
    if (pattern.ignoreCase) flags += 'i'
    if (pattern.multiline) flags += 'm'
    rule.pattern = RegExp(pattern.source, flags)
  }
})

var errorCount = 0
var errorFileCount = 0
var errorTypes = {}
var warningCount = 0
var warningFileCount = 0

files.forEach(function (path) {
  // read a file and split it into lines
  var firstError = true
  var firstWarning = true
  var all = fs.readFileSync(path, 'utf8')
  var lines = all.split('\n')
  // run every rule on each line
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    rules.forEach(function (rule) {
      var result
      while ((result = rule.pattern.exec(line)) !== null) {
        // print the file header for the first error/warning of each file
        if (firstError && firstWarning) {
          console.log(colors.black(colors.bgWhite(path)))
          console.log()
        }
        if (firstError) {
          firstError = false
          errorFileCount++
        }
        if (firstWarning) {
          firstWarning = false
          warningFileCount++
        }
        // increment error count and error type count if it's not a warning
        if (rule.warning) {
          warningCount++
        } else {
          errorCount++
          if (rule.slug in errorTypes) {
            errorTypes[rule.slug] = errorTypes[rule.slug] + 1
          } else {
            errorTypes[rule.slug] = 1
          }
        }

        // highlight the match area
        var index = result.index
        var match = result[0]
        var length = match.length
        var highlighted = line.substr(0, index) + colors.white(colors.bold(match)) + line.substr(index + length)

        // output the info and highlighted error text
        var loc = sprintf('%d:%d', i, index)
        var msg
        var color
        if (rule.warning) {
          msg = 'warning: ' + rule.message
          color = colors.yellow
        } else {
          msg = 'error: ' + rule.message
          color = colors.red
        }
        console.log(sprintf('%17s %s', colors.green(loc), color(msg)))
        console.log(colors.grey(highlighted))
        console.log()
      }
    })
  }
})

Object.keys(errorTypes).forEach(function (slug) {
  var count = errorTypes[slug]
  console.log(sprintf('%4d %s', count, slug))
})

if (warningCount > 0) {
  console.log(colors.yellow(sprintf('%d warnings found across %d files', warningCount, warningFileCount)))
}

if (errorCount === 0) {
  console.log(colors.green('No errors found! :)'))
} else {
  console.log()
  console.log(colors.red(sprintf('%d errors found across %d files', errorCount, errorFileCount)))
  process.exit(1)
}
