import Metalsmith from 'metalsmith'
import Markdown from 'metalsmith-markdown'
import Layouts from 'metalsmith-layouts'

export default Metalsmith(__dirname)
  .source('../src')
  .destination('../build')
  .use(Markdown())
  .use(Layouts({
    engine: 'handlebars',
    directory: '../layouts'
  }))
