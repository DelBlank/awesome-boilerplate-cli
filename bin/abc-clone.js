/* eslint-disable no-console */
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const { success, error } = require('log-symbols')
const commander = require('commander')
const execa = require('execa')

commander.parse(process.argv)
const bplType = commander.args[0]
const progress = ora(`abc: 正在拷贝模板`)
const root = process.cwd()
const bplNames = ['cjs', 'es6', 'react']

// 拷贝目录
function copyDirectory(source, dest) {
  execa('cp', ['-a', source, dest])
}

// 记录正确的日志
function log(message) {
  console.log(success, chalk.green(message))
}

// 处理错误
function handleError(message) {
  console.error(error, chalk.red(message))
  process.exit(1)
}

// 处理进度
function handleProgress() {
  const bplPath = `${path.join(__dirname, '../boilerplate', bplType)}/.`
  const commonBplPath = `${path.join(__dirname, '../boilerplate/common')}/.`
  const pkgPath = `${path.join(__dirname, '../boilerplate/package', bplType)}.json`

  return Promise.resolve(progress.start())
    .then(() => {
      copyDirectory(commonBplPath, root)
      copyDirectory(bplPath, root)
      copyDirectory(pkgPath, `${root}/package.json`)
    })
    .then(() => {
      progress.succeed()
      log('abc: 模板拷贝成功')
    })
    .catch(({ message }) => {
      progress.fail()
      handleError(
        `abc: 模板拷贝出错
        ${message}`
      )
    })
}

// 将模板拷贝到本地
function cloneBplToLocal() {
  if (!bplType) {
    handleError('abc: 请指定具体模板')
    return
  }

  if (!bplNames.includes(bplType)) {
    handleError('abc: 未找到同名模板')
    return
  }

  return handleProgress()
}

module.exports = cloneBplToLocal()
