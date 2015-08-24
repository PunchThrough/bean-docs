#!/usr/bin/env babel-node --harmony

import { argv } from 'optimist'
import build from './scripts/build'
import serve from './scripts/serve'

let tasks = new Map()

tasks.set('build', build)
tasks.set('serve', serve)

let listTasks = () => { console.log('Tasks:', Array.from(tasks.keys())) }

let task = argv._[0]

if (!task) {
  console.log('Usage: ./do TASK')
  listTasks()

} else if (!tasks.has(task)) {
  console.log('Task not found')
  listTasks()

} else {
  console.log('Running task:', task)
  let todo = tasks.get(task)
  todo(argv)
}
