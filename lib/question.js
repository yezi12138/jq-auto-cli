const inquirer = require('inquirer')
const { getDirFileList } = require('./node-operation')

/**
 * 生成文件的问题
 */
var arr1 = [
    {
        name: 'path',
        type: 'input',
        message: '请输入需要生成文件的绝对路径(C:\\Users\\xxx\\Desktop\\test): '
    },
    {
        name: 'filename',
        type: 'input',
        message: '请输入需要生成的文件名，以,分割(index,list,arcticle): '
    },
    {
        name: 'suffix',
        type: 'input',
        message: '请输入需要生成的文件名后缀，以,分割(js,css,html): '
    }
]

function generateQues() {
    return inquirer.prompt(arr1)
}

/**
 * 开发环境的问题
 */
function devQues(options) {
    var answers = options
    inquirer.prompt([
        {
            name: 'path',
            type: 'input',
            message: '请输入开发环境项目的绝对路径(C:\\Users\\test\\): '
        }
    ]).then(function (data) {
        answers = Object.assign({}, answers, data)
        let choices = getDirFileList(`${answers.path}\\js`)
        inquirer.prompt([
            {
                name: 'entry',
                type: 'checkbox',
                message: '请选择入口文件:',
                choices: choices.map(item => item.name + item.suffix)
            }
        ]).then(function (data) {
            answers = Object.assign({}, answers, data)
            answers.entry = choices.filter(item => {
                if (answers.entry.find(i => i === (item.name + item.suffix))) {
                    return true
                }
            })
            answers.output = 'dist'
            answers.linkcss = false
            const dev = require('../lib/dev')
            dev(answers)
        });
    });
}

/**
 * 生产环境的问题
 */
function buildQues(options) {
    var answers = options
    inquirer.prompt([
        {
            name: 'path',
            type: 'input',
            message: '请输入开发环境项目的绝对路径(C:\\Users\\test\\): '
        }
    ]).then(function (data) {
        answers = Object.assign({}, answers, data)
        let choices = getDirFileList(`${answers.path}\\js`)
        inquirer.prompt([
            {
                name: 'entry',
                type: 'checkbox',
                message: '请选择入口文件:',
                choices: choices.map(item => item.name + item.suffix)
            },
            {
                name: 'output',
                type: 'input',
                message: '请选择打包后的文件夹名(默认dist):',
                default: 'dist'
            },
            {
                name: 'polyfill',
                type: 'confirm',
                message: '是否需要旧版浏览器，导入polyfill(默认导入):',
                default: true
            },
            {
                name: 'linkcss',
                type: 'confirm',
                message: '是否需要内嵌样式(默认外联):'
            },
            {
                name: 'assets',
                type: 'confirm',
                message: '是否打包静态资源到目录:'
            }
        ]).then(function (data) {
            answers = Object.assign({}, answers, data)
            answers.entry = choices.filter(item => {
                if (answers.entry.find(i => i === (item.name + item.suffix))) {
                    return true
                }
            })
            const build = require('../lib/build')
            build(answers)
        });
    });
}



module.exports = {
    generateQues,
    devQues,
    buildQues
}