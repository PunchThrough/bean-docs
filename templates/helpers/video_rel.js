'use strict'


module.exports = (context, name, maxWidth, autoplay) => {
  let src = `${context.relativeRoot}_assets/images/${context.path.dir}/${context.path.name}/${name}`
  let style = ''
  if (maxWidth) {
    style = `max-width: ${maxWidth};`
  }

  let autoplayHtml
  if (autoplay) {
    autoplayHtml = `autoplay="autoplay" loop="loop"`
  } else {
    autoplayHtml = `controls="controls"`
  }

  return (
`<div class="guide-img-holder">
  <a href="${src}" target="_blank">
    <video class="guide-video" ${autoplayHtml} style="${style}"><source src="${src}" type="video/mp4"></video>
  </a>
</div>`
  )
}