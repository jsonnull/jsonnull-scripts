#!/usr/bin/env node
const path = require('path')
const spawn = require('cross-spawn')

const [executor, binName, script, ...args] = process.argv

main()

function main() {
  if (script) {
    runScript()
    return
  }

  const usageMessage = `
Usage: ${binName} [script] [--flags]
  `.trim()

  console.log(`\n${usageMessage}\n`)
}

function runScript() {
  const relativeScriptPath = path.join(__dirname, './scripts', script)
  const scriptPath = resolveScript(relativeScriptPath)

  if (!scriptPath) {
    console.log(`Could not resolve script ${relativeScriptPath}`)
    process.exit(1)
  }

  const result = spawn.sync(executor, [scriptPath, ...args], {
    stdio: 'inherit',
  })

  process.exit(result.status)
}

function resolveScript(scriptName) {
  try {
    return require.resolve(scriptName)
  } catch (e) {
    return null
  }
}
