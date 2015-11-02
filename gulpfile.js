'use strict'

let gulp = require('gulp')
let add = require('gulp-add')
let ghPages = require('gulp-gh-pages')

let config = {
  push: true
}

gulp.task('deploy', () => {
  console.log('deploy started')
  return gulp.src('build/**/*')
    .pipe(add('.nojekyll', ''))
    .pipe(ghPages(config))
})
