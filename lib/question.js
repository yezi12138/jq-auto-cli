const inquirer = require('inquirer')
const { getDirFileList, createFile } = require('./node-operation')
const { success, fail, blue } = require('./chalk')

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
 * 读取配置文件
 * @param {} options
 */

let readConfig = function(absPath) {
  let config = null
  try {
    config = require(`${absPath}\\base.config.js`)
    if (config) {
      success('读取配置成功...')
      blue('正在运行下一步...')
      return config
    }
  } catch (e) {
    fail('读取配置失败...')
    fail('重新开始生成配置文件...')
    config = null
  }
  return config
}

/**
 * 生成/获取配置
 */
function devAndBuildQues(mode) {
  var answers = {}
  inquirer
    .prompt([
      {
        name: 'path',
        type: 'input',
        message: '请输入项目的绝对路径(C:\\Users\\test\\): '
      }
    ])
    .then(function(data) {
      answers = Object.assign({}, answers, data)
      let config = readConfig(answers.path)
      if (config) {
        answers = config
        run(mode, answers)
      } else {
        let choices = getDirFileList(`${answers.path}\\js`)
        inquirer
          .prompt([
            {
              name: 'entry',
              type: 'checkbox',
              message: '请选择入口文件:',
              choices: choices.map(item => item.name + item.suffix)
            },
            {
              name: 'output',
              type: 'input',
              message: '请选择打包后的文件夹名:',
              default: 'dist'
            },
            {
              name: 'polyfill',
              type: 'confirm',
              message: '是否需要兼容旧版浏览器，导入polyfill:'
            },
            {
              name: 'insetCSS',
              type: 'confirm',
              message: '是否使用外联样式(否则为内嵌):'
            },
            {
              name: 'copyToDist',
              type: 'confirm',
              message: '是否打包静态资源到目录:'
            },
            {
              name: 'publicPath',
              type: 'input',
              message: '请输入静态文件的publicPath:',
              default: './'
            },
            {
              name: 'port',
              type: 'input',
              message: '请输入监听的端口(默认8080):',
              default: 8080
            },
            {
              name: 'save',
              type: 'confirm',
              message: '是否保存设置，生成配置文件:'
            }
          ])
          .then(function(data) {
            answers = Object.assign({}, answers, data)
            answers.entry = choices.filter(item => {
              if (answers.entry.find(i => i === item.name + item.suffix)) {
                return true
              }
            })
            // 保存配置
            if (answers.save) {
              try {
                let absPath = `${answers.path}\\base.config.js`
                let file = createFile(
                  absPath,
                  `module.exports = ${JSON.stringify(answers, null, '\t')}`
                )
                success(`创建配置文件成功： ${absPath}`)
              } catch (e) {
                console.log(e)
              }
            }
            run(mode, answers)
          })
      }
    })
}

/**
 * 执行开发/生产环境操作
 */

let run = function(mode, answers) {
  if (mode === 'development') {
    const dev = require('../lib/dev')
    dev(answers)
  } else if (mode === 'production') {
    const build = require('../lib/build')
    build(answers)
  }
}

module.exports = {
  generateQues,
  devAndBuildQues
}
