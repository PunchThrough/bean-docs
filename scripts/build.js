import rimraf from 'rimraf'
import core from './core'

export default function() {
  console.log('Deleting old build files')
  rimraf('build', (err) => {
    if (err) throw err
    console.log('Starting build')
    core.build(function(err) {
      if (err) throw err
      else console.log('Build successful!')
    })
  })
}
