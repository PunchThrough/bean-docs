'use strict'

module.exports = (context, name) => {
  let src = context.relativeRoot + '_assets/images/' + context.path.dir + '/' + context.path.name + '/' + name
  return '<video class="guide-video" autoplay="autoplay" loop="loop"><source src="' + src + '" type="video/mp4"></video>'
}
