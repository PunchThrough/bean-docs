export default (context, name) => {
  let src = context.relativeRoot + 'assets/images/' + context.path.dir + '/' + context.path.name + '/' + name
  return '<video autoplay="autoplay" loop="loop"><source src="' + src + '" type="video/mp4"></video>'
}
