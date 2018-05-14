const path = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const camelcase = require('lodash.camelcase')
const { pkg, appDirectory } = require('../utils')

// Utility functions
const capitalize = s => s[0].toUpperCase() + s.slice(1)

const minify = process.env.BUILD_MINIFY === 'true'
const format = process.env.BUILD_FORMAT
const nodeEnv = process.env.NODE_ENV

const esm = format === 'esm'
const umd = format === 'umd'

const name = capitalize(camelcase(pkg.name))
const filename = [
  'dist/',
  pkg.name,
  `.${format}`,
  minify ? '.min' : null,
  '.js',
]
  .filter(Boolean)
  .join('')

const config = {
  input: path.join(appDirectory, 'src/index.js'),
  external: ['react'],
  output: {
    name: name,
    file: filename,
    format: esm ? 'es' : format,
    exports: esm ? 'named' : 'auto',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    babel({
      exclude: '**/node_modules/**',
      presets: [path.join(__dirname, './babelrc.js')],
      babelrc: true,
    }),
    minify ? uglify() : null,
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    commonjs(),
  ].filter(Boolean),
}

module.exports = config
