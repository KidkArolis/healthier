const path = require('path')
const test = require('tape')
const healthier = require('../')

test('api usage', async function (t) {
  t.plan(3)
  const results = await healthier.lintFiles([], { cwd: path.join(__dirname, '../bin') })
  t.equal(Array.isArray(results), true, 'results is an array')
  t.equal(results.length, 1, 'one file was linted')
  t.equal(results[0].errorCount, 0, 'no errors were found')
})

test('standard code quality', async function (t) {
  t.plan(4)
  const results = await healthier.lintText(`a();\n`)
  t.equal(Array.isArray(results), true, 'results is an array')
  t.equal(results.length, 1, 'one file was linted')
  t.equal(results[0].errorCount, 1, 'one error found')
  t.equal(results[0].messages[0].message, "'a' is not defined.", 'first message')
})

test('standard 14 checks', async function (t) {
  t.plan(4)
  const results = await healthier.lintText(`let a = 1\nmodule.exports = a\n`)
  t.equal(Array.isArray(results), true, 'results is an array')
  t.equal(results.length, 1, 'one file was linted')
  t.equal(results[0].errorCount, 1, 'one error found')
  t.equal(results[0].messages[0].message, "'a' is never reassigned. Use 'const' instead.", 'first message')
})
