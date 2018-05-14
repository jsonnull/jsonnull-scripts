const path = require('path')
const { appDirectory } = require('../utils')

const ignores = [
  '/node_modules/',
  '/fixtures/',
  '/__tests__/helpers/',
  '__mocks__',
]

const jestConfig = {
  roots: [path.join(appDirectory, 'src')],
  // testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverageFrom: ['src/**/*.+(js|jsx)'],
  testMatch: ['**/__tests__/**/*.+(js|jsx)'],
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    '^.+\\.js$': path.join(__dirname, './babel-transform'),
  },
}

module.exports = jestConfig
