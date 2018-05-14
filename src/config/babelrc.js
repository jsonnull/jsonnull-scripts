const isTest = (process.env.BABEL_ENV || process.env.NODE_ENV) === 'test'
const isRollup = process.env.BUILD_ROLLUP === 'true'

const envTargets = isTest
  ? { node: 'current' }
  : isRollup ? { browsers: ['last 2 versions'] } : { node: '4.5' }
const envOptions = {
  modules: isRollup ? false : 'commonjs',
  useBuiltIns: 'usage',
  targets: envTargets,
}

module.exports = () => ({
  presets: [
    [require.resolve('@babel/preset-env'), envOptions],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-flow'),
  ],
  plugins: [
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    isTest ? require.resolve('@babel/plugin-transform-modules-commonjs') : null,
  ].filter(Boolean),
})
