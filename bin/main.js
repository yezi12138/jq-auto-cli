#!/usr/bin/env node

const program = require('commander')
const createFiles = require('../lib/createFiles')
const { generateQues, devQues, buildQues } = require('../lib/question')

program
    .version(require('../package').version)

/**
 * generate
 * 自动生成文件
 */
program
.command('generate')
.alias('g')
.description('auto create files')
.action(function () {
    generateQues().then(answers => {
        createFiles(answers)
    })
})

/**
 * build progress
 */
program
  .command('build')
  .description('build the project')
  .action((options) => {
    buildQues({
        mode: 'production'
    })
  })

/**
 * dev progress
 */
program
.command('dev')
.description('dev the project')
.action((options) => {
    devQues({
        mode: 'development'
    })
})

program.parse(process.argv)