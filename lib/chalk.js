const chalk = require('chalk')

module.exports = {
    success: (str) => console.log(chalk.yellowBright(str)),
    fail: (str) => console.log(chalk.redBright(str)),
    blue: (str) => console.log(chalk.blueBright(str))
}