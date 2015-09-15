var gulp = require('gulp')
var ghPages = require('gulp-gh-pages')
var exec = require('child_process').exec

var config = {
  push: true
}

gulp.task('build', function(done) {
  exec('./do build', function(err, stdout, stderr) {
    if (err) throw err
    process.stdout.write(stdout)
    process.stderr.write(stderr)
    done()
  })
})

gulp.task('deploy', ['build'], function() {
  return gulp.src('build/**/*')
    .pipe(ghPages(config))
})
