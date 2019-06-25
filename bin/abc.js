#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

commander
  .version(pkg.version, '-v --version')
  .usage('<command> [options]')
  .command('clone [template]', '克隆模板')
  .parse(process.argv)

module.exports = commander
