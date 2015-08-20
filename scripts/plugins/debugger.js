import util from 'util'

export default () => {
  return (files) => {
    Object.keys(files).forEach(file => {
      let data = files[file]
      console.log()
      console.log(file)
      console.log('========')
      console.log(util.inspect(data, {depth: 5}))
    })
  }
}
