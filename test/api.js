var path = require('path')
var test = require('tape')
var healthier = require('../')

test('api usage', function(t) {
  t.plan(3)
  healthier.lintFiles([], { cwd: 'bin' }, function(err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 0, 'no errors')
  })
})

test('prettier style', function(t) {
  t.plan(4)
  const result = healthier.lintTextSync(`const a = '2'`, {
    cwd: path.join(__dirname, 'fixtures'),
    filename: path.join(__dirname, 'fixtures', 'test.js')
  })
  t.equal(typeof result, 'object', 'result is an object')
  t.equal(result.errorCount, 2, '2 errors')

  t.equal(result.results[0].messages[0].message, "'a' is assigned a value but never used.", 'first message')
  t.equal(result.results[0].messages[1].message, 'Replace `\'2\'` with `"2";⏎`', 'second message')
})

test('standard code quality', function(t) {
  t.plan(3)
  const result = healthier.lintTextSync(`a();\n`, {
    cwd: path.join(__dirname, 'fixtures'),
    filename: path.join(__dirname, 'fixtures', 'test.js')
  })
  t.equal(typeof result, 'object', 'result is an object')
  t.equal(result.errorCount, 1, '1 errors')

  t.equal(result.results[0].messages[0].message, "'a' is not defined.", 'first message')
})
