'use strict'

let S = require('string')

module.exports = (context, imagePath, desc, projectLink) => {
  let srcTemplate = '{{relativeRoot}}_assets/images/projects/{{imagePath}}'
  let htmlTemplate = ('<div class="guide-tile-holder bg">' +
                      '<div class="crop">' +
                      '<a href="{{projectLink}}">' +
                      '<img class="guide-img" src="{{src}}" alt="{{desc}}" title="{{desc}}" ' +
                      '</a>' +
                      '<div class="overlay"> <h2>{{desc}}</h2> </div>' +
                      '</div>' +
                      '</div>')

  let src = S(srcTemplate).template({
    relativeRoot: context.relativeRoot,  // Relative root (e.g. './')
    imagePath: imagePath  // Actual filename of image (e.g. 'birbs.jpg')
  })

  return S(htmlTemplate).template({
    src: src,
    desc: desc,
    projectLink: projectLink  // Link to the project page
  })
}
