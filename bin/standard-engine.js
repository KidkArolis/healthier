#!/usr/bin/env node

// Note this is adapted from standard-engine
// For now, we're still utilising the rest of standard-engine
// except for the CLI interface

module.exports = Cli

const fs = require('fs')
const path = require('path')
const findRoot = require('find-root')
const minimist = require('minimist')
const getStdin = require('get-stdin')

function Cli(opts) {
  const Linter = require('standard-engine').linter
  const standard = new Linter(opts)

  opts = Object.assign(
    {
      cmd: 'standard-engine',
      tagline: 'JavaScript Custom Style',
      version: '0.0.0',
    },
    opts
  )

  const argv = minimist(process.argv.slice(2), {
    alias: {
      global: 'globals',
      plugin: 'plugins',
      env: 'envs',
      format: 'f',
      version: 'v',
      help: 'h',
    },
    boolean: ['fix', 'help', 'stdin', 'version'],
    string: ['format', 'global', 'plugin', 'parser', 'env'],
  })

  // Unix convention: Command line argument `-` is a shorthand for `--stdin`
  if (argv._[0] === '-') {
    argv.stdin = true
    argv._.shift()
  }

  if (argv.help) {
    if (opts.tagline) console.log('%s - %s (%s)', opts.cmd, opts.tagline, opts.homepage)
    console.log(`
Usage:
    ${opts.cmd} <flags> [FILES...]

    If FILES is omitted, all JavaScript source files (*.js, *.jsx, *.mjs, *.cjs)
    in the current working directory are checked, recursively.

    Certain paths (node_modules/, coverage/, vendor/, *.min.js, bundle.js, and
    files/folders that begin with '.' like .git/) are automatically ignored.

    Paths in a project's root .gitignore and .prettierignore files are also automatically ignored.

Flags:
    -f, --format    Use a specific output format - default: stylish
        --fix       Automatically fix problems
    -v, --version   Show current version
    -h, --help      Show usage information

Flags (advanced):
        --stdin     Read file text from stdin
        --global    Declare global variable
        --plugin    Use custom eslint plugin
        --env       Use custom eslint environment
        --parser    Use custom js parser (e.g. babel-eslint)
    `)
    process.exitCode = 0
    return
  }

  if (argv.version) {
    console.log(opts.version)
    process.exitCode = 0
    return
  }

  let prettierIgnore
  try {
    const root = findRoot(process.cwd())
    prettierIgnore = fs.readFileSync(path.join(root, '.prettierignore'), 'utf8')
  } catch (e) {}
  if (prettierIgnore) prettierIgnore = prettierIgnore.split(/\r?\n/)

  const lintOpts = {
    fix: argv.fix,
    globals: argv.global,
    plugins: argv.plugin,
    envs: argv.env,
    parser: argv.parser,
    ignore: prettierIgnore,
  }

  let stdinText

  if (argv.stdin) {
    getStdin().then(function (text) {
      stdinText = text
      standard.lintText(text, lintOpts, onResult)
    })
  } else {
    standard.lintFiles(argv._, lintOpts, onResult)
  }

  function onResult(err, result) {
    if (err) return onError(err)

    if (argv.stdin && argv.fix) {
      if (result.results[0].output) {
        // Code contained fixable errors, so print the fixed code
        process.stdout.write(result.results[0].output)
      } else {
        // Code did not contain fixable errors, so print original code
        process.stdout.write(stdinText)
      }
    }

    if (!result.errorCount && !result.warningCount) {
      process.exitCode = 0
      return
    }

    let formatter
    try {
      formatter = new standard.eslint.CLIEngine(opts.eslintConfig).getFormatter(argv.format)
    } catch (e) {
      console.error(e.message)
      process.exitCode = 1
      return
    }
    const output = formatter(result.results)
    process.stdout.write(output)
    process.exitCode = result.errorCount ? 1 : 0
  }

  function onError(err) {
    console.error(opts.cmd + ': Unexpected linter output:\n')
    console.error(err.stack || err.message || err)
    console.error('\nIf you think this is a bug in `%s`, open an issue: %s', opts.cmd, opts.bugs)
    process.exitCode = 1
  }
}
