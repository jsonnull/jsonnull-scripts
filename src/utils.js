const path = require('path')
const fs = require('fs')
const readPkgUp = require('read-pkg-up')
const { promisify } = require('util')
const resolveBin = promisify(require('resolve-bin'))

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
const appDirectory = path.dirname(pkgPath)

const fromRoot = (...p) => path.join(appDirectory, ...p)

module.exports = {
  pkg,
  appDirectory,
  resolveBin,
  fromRoot,
}
