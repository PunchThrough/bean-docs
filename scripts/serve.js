import Serve from 'metalsmith-serve'
import Watch from 'metalsmith-watch'
import core from './core'

const config = {
  watch: {
    paths: {
      '${source}/**/*.md': true,
      '../templates/**/*': '**/*.md',
      '${source}/**/*.styl': '**/*',
      '${source}/_assets/**/*': '**/*'
    },
    livereload: true
  }
}

export default function() {
  core
  .use(Serve())
  .use(Watch(config.watch))
  .build(function(err) {
    if (err) throw err
  })
}
