import core from './core'

export default function() {
  console.log('Starting build')
  core.build(function(err) {
    if (err) throw err
    else console.log('Build successful!')
  })
}
