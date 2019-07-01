#!/usr/bin/env node

const { generateQues, devAndBuildQues } = require('../lib/question')
const { fail,success } = require('../lib/chalk')
const program = require('commander')
const shell = require('shelljs')
var package = require("../package.json");

// let argv = process.argv.slice(2)
// if (argv.length === 1) {
//   let directive = argv[0]
//   switch (directive) {
//     case 'dev':
//         devAndBuildQues('development')
//       break
//     case 'build':
//         devAndBuildQues('production')
//       break
//     case 'generate':
//       generateQues()
//       break
//   }
// } else {
//     fail('错误指令')
// }
program
  .command('build')
  .description('build')
  .action(option => {
    devAndBuildQues('production')
  })
program
  .command('dev')
  .description('dev')
  .action(option => {
    devAndBuildQues('development')
  })
program
  .command('generate')
  .description('generate')
  .action(option => {
    generateQues()
  })
  program
  .command('init')
  .description('init')
  .action(option => {
    let devDepend = Object.keys(package.devDependencies).join(' ')
    if (shell.exec(`cnpm i -D ${devDepend}`).code !== 0) {
        fail('初始化依赖失败...')
    } else {
        success('初始化依赖完毕...')
    }
  })

program.parse(process.argv)
