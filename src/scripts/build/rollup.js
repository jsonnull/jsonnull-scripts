const path = require('path')
const spawn = require('cross-spawn')
const rimraf = require('rimraf')
const yargsParser = require('yargs-parser')
const { appDirectory, fromRoot, resolveBin } = require('../../utils')

const main = async () => {
  const args = process.argv.slice(2)
  const parsedArgs = yargsParser(args)

  // Configuration
  const config = [
    '--config',
    path.join(__dirname, '../../config/rollup.config.js'),
  ]
  const input = path.join(appDirectory, 'src/index.js')
  const watch = parsedArgs.watch ? '--watch' : ''

  // Formats to write
  const formats = ['esm', 'cjs', 'umd', 'umd.min']

  // Binaries
  const crossEnv = await resolveBin('cross-env')
  const rollup = await resolveBin('rollup')

  // Remove existing build dir
  rimraf.sync(fromRoot('dist'))

  const resultStatus = formats.reduce((status, format) => {
    const [formatName, minify = false] = format.split('.')
    const nodeEnv = minify ? 'production' : 'development'
    const sourceMap = formatName === 'umd' ? '--sourcemap' : ''
    const buildMinify = Boolean(minify)

    const env = [
      'BUILD_ROLLUP=true',
      `BUILD_FORMAT=${formatName}`,
      `BUILD_MINIFY=${buildMinify}`,
      `NODE_ENV=${nodeEnv}`,
    ]

    const build = spawn.sync(
      crossEnv,
      [...env, rollup, ...config, input, watch],
      {
        stdio: 'inherit',
      },
    )

    if (build.status !== 0) {
      return build.states
    }

    return status
  }, 0)

  process.exit(resultStatus)
}

main()
