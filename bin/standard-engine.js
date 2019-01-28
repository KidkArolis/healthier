#!/usr/bin/env node

// Note this is copied from standard-engine
// to extend the CLI with an extra `--init` flag.

module.exports = Cli

var fs = require('fs')
var minimist = require('minimist')
var getStdin = require('get-stdin')

function Cli(opts) {
  var Linter = require('standard-engine').linter
  var standard = new Linter(opts)

  opts = Object.assign(
    {
      cmd: 'standard-engine',
      tagline: 'JavaScript Custom Style',
      version: '0.0.0'
    },
    opts
  )

  var argv = minimist(process.argv.slice(2), {
    alias: {
      global: 'globals',
      plugin: 'plugins',
      env: 'envs',
      help: 'h',
      format: 'f'
    },
    boolean: ['init', 'help', 'stdin', 'verbose', 'version'],
    string: ['format', 'global', 'plugin', 'parser', 'env']
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

    If FILES is omitted, then all JavaScript source files (*.js, *.jsx) in the current
    working directory are checked, recursively.
    Certain paths (node_modules/, coverage/, vendor/, *.min.js, bundle.js, and
    files/folders that begin with '.' like .git/) are automatically ignored.
    Paths in a project's root .gitignore file are also automatically ignored.

Flags:
        --init      Create a recommended .prettierrc file
    -f, --format    Use a specific output format - default: stylish
        --version   Show current version
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

  if (argv.init) {
    if (fs.existsSync('./.prettierrc')) {
      console.error(opts.cmd + ': .prettierrc file already exists in the current directory.')
      process.exitCode = 1
      return
    } else {
      fs.writeFileSync(
        './.prettierrc',
        `{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 120
}
`
      )
      console.log(opts.cmd + ': .prettierrc file succesfully created.')
      process.exitCode = 0
      return
    }
  }

  var lintOpts = {
    globals: argv.global,
    plugins: argv.plugin,
    envs: argv.env,
    parser: argv.parser
  }

  if (argv.stdin) {
    getStdin().then(function(text) {
      standard.lintText(text, lintOpts, onResult)
    })
  } else {
    standard.lintFiles(argv._, lintOpts, onResult)
  }

  function onResult(err, result) {
    if (err) return onError(err)

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
    process.stderr.write(output)
    process.exitCode = result.errorCount ? 1 : 0
  }

  function onError(err) {
    console.error(opts.cmd + ': Unexpected linter output:\n')
    console.error(err.stack || err.message || err)
    console.error('\nIf you think this is a bug in `%s`, open an issue: %s', opts.cmd, opts.bugs)
    process.exitCode = 1
  }
}
