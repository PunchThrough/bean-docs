export default (context, name, desc) => {
  let src = context.relativeRoot + '_assets/images/' + context.path.dir + '/' + context.path.name + '/' + name
  return '<div class="guide-img-holder"><img class="guide-img" src="' + src + '" alt="' + desc + '" title="' + desc + '" /></div>'
}
