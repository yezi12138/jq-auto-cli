const { createDir, createFile, copyFile } = require('./files')
const { success, fail, blue } = require('./chalk')

/**
 * 根据输入，生成对应的html，css，js
 */

let fileCount = 0

/**
 * 创建子级目录
 * @param {*} absDirPath
 * @param {*} fileSuffix 子级目录数组
 */
let createChildDir = function(absDirPath, fileSuffix) {
  fileSuffix.forEach(path => {
    createDir(`${absDirPath}\\${path}`, true)
  })
}

/**
 * 创建文件的依赖路径
 * @param {*} absDirPath 绝对路径
 * @param {*} filename 文件名的数组
 * @param {*} fileSuffix 文件后缀数组
 */
let createFilePath = function(absDirPath, filename, fileSuffix) {
  let obj = {}
  fileSuffix.forEach(suffix => {
    obj[suffix] = filename.map(item => {
      fileCount++
      return `${absDirPath}\\${suffix}\\${item}.${suffix}`
    })
  })
  return obj
}

let main = function(answers) {
  let dirPathName = answers.path
  let filename = answers.filename.split(',')
  let fileSuffix = answers.suffix.split(',')
  let finishCount = 0
  if (dirPathName && filename && filename.length > 0) {
    try {
      let absDirPath = createDir(dirPathName)
      createChildDir(absDirPath, fileSuffix)
      let filePaths = createFilePath(absDirPath, filename, fileSuffix)
      Object.values(filePaths).forEach(arr => {
        arr.forEach(absDirPath => {
          if (answers.modPath) {
            copyFile(answers.modPath, absDirPath)
          } else {
            createFile(absDirPath, '')
          }
          blue(`[${++finishCount}/${fileCount}]: ${absDirPath}生成完毕...`)
        })
      })
      success('创建成功')
    } catch (e) {
      fail('创建文件失败:' + e)
    }
  }
}

module.exports = main
