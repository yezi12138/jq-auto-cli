const { fail } = require('../lib/chalk')

module.exports = function(source) {
  this.cacheable()
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
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
