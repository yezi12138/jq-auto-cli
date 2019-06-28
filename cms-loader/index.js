const { fail } = require('../lib/chalk')

module.exports = function(source) {
  this.cacheable()
//   获取所有的代码块
  let reg = /\<\!-- cms:([^:\s]+) --\>([\s\S]*)<\!-- cms:\1 --\>/g
  let getStrRegExp = cmsName => {
    return new RegExp(
      `(\<\!-- cms:${cmsName} --\>[\\s\\S]*<\!-- cms:${cmsName} --\>)`
    )
  }
  var matches = source.match(reg)
  if (matches) {
    matches.forEach(match => {
      try {
        // 替换代码块为占位符
        let result = /\<\!-- cms:([^:\s]+) --\>([\s\S]*)<\!-- cms:\1 --\>/.exec(match)
        let cmsName = result[1]
        source = source.replace(getStrRegExp(cmsName), `(#${cmsName}#)`)
      } catch (e) {
        fail('替换字符串失败: ' + `${match}`)
        fail('错误如下: \n' + `${e}`)
      }
    })
  }
  return source
}
