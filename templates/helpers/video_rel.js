'use strict'

module.exports = (context, name, maxWidth) => {
  let src = `${context.relativeRoot}_assets/images/${context.path.dir}/${context.path.name}/${name}`
  let style = ''
  if (maxWidth) {
    style = `max-width: ${maxWidth};`
  }
  return (
`<div class="guide-img-holder">
  <a href="${src}" target="_blank">
    <video class="guide-video" autoplay="autoplay" loop="loop" style="${style}"><source src="${src}" type="video/mp4"></video>
  </a>
</div>`
  )
}
