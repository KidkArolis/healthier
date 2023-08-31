#!/usr/bin/env node

// Note this is adapted from standard-engine
// For now, we're still utilising the rest of standard-engine
// except for the CLI interface

module.exports = cli

const minimist = require('minimist')
const StandardEngine = require('standard-engine').StandardEngine
const getStdin = require('./get-stdin')
const prettierIgnore = require('./prettier-ignore')

/**
 * @typedef StandardCliOptions
 * @property {import('standard-engine').StandardEngine} [standardEngine]
 * @property {string} [cmd]
 * @property {string} [tagline]
 * @property {string} [homepage]
 * @property {string} [bugs]
 */

/**
 * @param {Omit<import('standard-engine').StandardEngineOptions, 'cmd'> & StandardCliOptions} rawOpts
 * @returns {void}
 */
function cli(rawOpts) {
  const opts = {
    cmd: 'standard-engine',
    tagline: 'JavaScript Custom Style',
    version: '0.0.0',
    ...rawOpts,
  }

  const standard = rawOpts.standardEngine || new StandardEngine(opts)

  const argv = minimist(process.argv.slice(2), {
    alias: {
      global: 'globals',
      plugin: 'plugins',
      env: 'envs',
      format: 'f',
      help: 'h',
    },
    boolean: ['fix', 'help', 'stdin', 'version'],
    string: ['format', 'ext', 'global', 'plugin', 'parser', 'env'],
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

    Certain paths (node_modules/, coverage/, vendor/, *.min.js, and
    files/folders that begin with '.' like .git/) are automatically ignored.

    Paths in a project's root .gitignore and .prettierignore file are also automatically ignored.

Flags:
    -f, --format    Use a specific output format - default: stylish
        --fix       Automatically fix problems
        --version   Show current version
    -h, --help      Show usage information

Flags (advanced):
        --stdin     Read file text from stdin
        --ext       Specify JavaScript file extensions
        --global    Declare global variable
        --plugin    Use custom eslint plugin
        --env       Use custom eslint environment
        --parser    Use custom js parser (e.g. @babel/eslint-parser)
    `)
    process.exitCode = 0
    return
  }

  if (argv.version) {
    console.log(opts.version)
    process.exitCode = 0
    return
  }

  const lintOpts = {
    fix: argv.fix,
    extensions: argv.ext,
    globals: argv.global,
    plugins: argv.plugin,
    envs: argv.env,
    parser: argv.parser,
    ignore: prettierIgnore(),
  }

  const outputFixed = argv.stdin && argv.fix

  Promise.resolve(argv.stdin ? getStdin() : '')
    .then(async (stdinText) => {
      /** @type {import('eslint').ESLint.LintResult[]} */
      let results

      try {
        results = argv.stdin ? await standard.lintText(stdinText, lintOpts) : await standard.lintFiles(argv._, lintOpts)
      } catch (err) {
        console.error(opts.cmd + ': Unexpected linter output:\n')
        if (err instanceof Error) {
          console.error(err.stack || err.message)
        } else {
          console.error(err)
        }
        console.error('\nIf you think this is a bug in `%s`, open an issue: %s', opts.cmd, opts.bugs)
        process.exitCode = 1
        return
      }

      if (!results) throw new Error('expected a results')

      if (outputFixed) {
        if (results[0] && results[0].output) {
          // Code contained fixable errors, so print the fixed code
          process.stdout.write(results[0].output)
        } else {
          // Code did not contain fixable errors, so print original code
          process.stdout.write(stdinText)
        }
      }

      const hasErrors = results.some((item) => item.errorCount !== 0)
      const hasWarnings = results.some((item) => item.warningCount !== 0)

      if (!hasErrors && !hasWarnings) {
        process.exitCode = 0
        return
      }

      console.log('%s: %s (%s)', opts.cmd, opts.tagline, opts.homepage)

      if (hasWarnings) {
        const homepage = opts.homepage != null ? ` (${opts.homepage})` : ''
        console.error(
          '%s: %s',
          opts.cmd,
          `Some warnings are present which will be errors in the next version${homepage}`,
        )
      }

      let formatter
      try {
        const eslintConfig = standard.resolveEslintConfig(lintOpts)
        const eslint = new standard.eslint.ESLint(eslintConfig)
        formatter = await eslint.loadFormatter(argv.format)
      } catch (e) {
        console.error(e.message)
        process.exitCode = 1
        return
      }
      const output = formatter.format(results)
      process.stdout.write(output)
      process.exitCode = hasErrors ? 1 : 0
    })
    .catch((err) =>
      process.nextTick(() => {
        throw err
      }),
    )
}
