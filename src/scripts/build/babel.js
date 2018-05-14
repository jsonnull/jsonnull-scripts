const path = require('path')
const spawn = require('cross-spawn')
const rimraf = require('rimraf')
const { fromRoot, resolveBin } = require('../../utils')

const main = async () => {
  const args = process.argv.slice(2)

  // Configuration
  const config = ['--presets', path.join(__dirname, '../../config/babelrc.js')]
  const copyFiles = ['--copy-files']
  const outDir = ['--out-dir', 'dist']
  const ignore = ['--ignore', '__tests__,__mocks__']

  // Remove existing build dir
  rimraf.sync(fromRoot('dist'))

  const bin = await resolveBin('@babel/cli', { executable: 'babel' })

  const result = spawn.sync(
    bin,
    [...outDir, ...copyFiles, ...ignore, ...config, 'src'].concat(args),
    { stdio: 'inherit' },
  )

  process.exit(result.status)
}

main()
