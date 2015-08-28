export default (context, name, desc) => {
  let src = '/assets/images/' + context.path.dir + '/' + context.path.name + '/' + name
  return '<img src="' + src + '" alt="' + desc + '" title="' + desc + '" />'
}
