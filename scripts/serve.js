import Serve from 'metalsmith-serve'
import Watch from 'metalsmith-watch'
import core from './core'

export default function() {
  core
  .use(Serve())
  .use(Watch({
    paths: {
      '../src/**/*': true
    },
    livereload: true
  }))
  .build(function(err) {
    if (err) throw err
  })
}
