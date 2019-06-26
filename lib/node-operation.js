
const fs = require('fs')

/**
 * 创建目录
 * @param {*} dirPathName 
 */
let createDir = function (dirPathName) {
    let absDirPath = dirPathName
    if (!fs.existsSync(absDirPath)) {
        fs.mkdirSync(absDirPath)
    }
    return absDirPath
}

/**
 * 删除目录
 * @param {*} path 
 */
function delDir(path) {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach((file) => {
            let curPath = path + "\\" + file
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

/**
 * 获取目录下面所有文件的列表
 * @param {*} absDirPath 
 */
function getDirFileList(absDirPath) {
    var dirs = []
    var readDir = fs.readdirSync(absDirPath)
    readDir.forEach(item => {
        var data = fs.statSync(`${absDirPath}\\${item}`)
        if (data.isFile()) {
            dirs.push({
                name: item.replace(/(.\w+)$/, ''),
                path: `${absDirPath}\\${item}`,
                suffix: /\.[^\.]+$/.exec(item)
            })
        }
    })
    return dirs
}

/**
 * 创建文件
 * @param {*} absDirPath 绝对路径
 * @param {*} data 数据
 */
let createFile = function (absDirPath, data) {
    let file = null
    if (fs.existsSync(absDirPath)) {
        fs.unlinkSync(absDirPath)
    }
    file = fs.writeFileSync(absDirPath, data)
    return file
}

module.exports = {
    createDir,
    delDir,
    createFile,
    getDirFileList
}