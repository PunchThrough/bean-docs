import Metalsmith from 'metalsmith'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'

const config = {
  src: '../src',
  dest: '../build',
  layouts: {
    engine: 'handlebars',
    directory: '../layouts'
  }
}

export default Metalsmith(__dirname)
  .source(config.src)
  .destination(config.dest)
  .use(Markdown())
  .use(Layouts(config.layouts))
