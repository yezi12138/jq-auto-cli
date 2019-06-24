#!/usr/bin/env node

const program = require('commander')
const createFiles = require('../lib/createFiles')
const { generateQues, devBuildQues } = require('../lib/question')

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
  .option('-l, --linkcss [linkcss]', 'css样式是否以link形式嵌入，不是则内联')
  .option('-f, --polyfill [polyfill]', '是否需要hacIE8兼容，默认开启')
  .description('build the project')
  .action((options) => {
    devBuildQues({
        mode: 'production',
        linkcss: options.linkcss,
        polyfill: options.polyfill
    })
  })

/**
 * dev progress
 */
program
.command('dev')
.option('-p, --port [port]', '监听的端口, 默认8080')
.description('dev the project')
.action((options) => {
    devBuildQues({
        mode: 'development',
        port: options.port
    })
})

program.parse(process.argv)