const createFiles = require('../lib/createFiles')
const { generateQues, devAndBuildQues } = require('../lib/question')
const { fail } = require('../lib/chalk')

let argv = process.argv.slice(2)
if (argv.length === 1) {
  let directive = argv[0]
  switch (directive) {
    case 'dev':
        devAndBuildQues('development')
      break
    case 'build':
        devAndBuildQues('production')
      break
    case 'generate':
      generateQues().then(answers => {
        createFiles(answers)
      })
      break
  }
} else {
    fail('错误指令')
}
