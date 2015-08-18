#!/usr/bin/env babel-node --harmony

import { argv } from 'optimist'
import build from './scripts/build'

var tasks = new Map()

tasks.set('build', () => {
  build()
})

var listTasks = () => { console.log('Tasks:', Array.from(tasks.keys())) }

var task = argv._[0]

if (!task) {
  console.log('Syntax: ./do TASK')
  listTasks()

} else if (!tasks.has(task)) {
  console.log('Task not found')
  listTasks()

} else {
  console.log('Running task:', task)
  var todo = tasks.get(task)
  todo()
}
