'use strict'

let S = require('string')

module.exports = (context, name, desc, maxWidth) => {
  let styleTemplate = 'max-width: {{maxWidth}};'
  let srcTemplate = '{{relativeRoot}}_assets/images/{{pathDir}}/{{pathName}}/{{name}}'
  let htmlTemplate = ('<div class="guide-img-holder">' +
                      '<a href={{src}} target="_blank">' +
                      '<img class="guide-img" src="{{src}}" alt="{{desc}}" title="{{desc}}" style="{{style}}"/>' +
                      '</a>' +
                      '</div>')

  let style = ''
  if (typeof maxWidth === 'string') {  // Handlebars passes in an object if the last argument is omitted (??)
    style = S(styleTemplate).template({
      maxWidth: maxWidth
    })
  }

  let src = S(srcTemplate).template({
    relativeRoot: context.relativeRoot,
    pathDir: context.path.dir,
    pathName: context.path.name,
    name: name
  })

  return S(htmlTemplate).template({
    src: src,
    desc: desc,
    style: style
  })
}
