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

test('standard code quality', function(t) {
  t.plan(3)
  const result = healthier.lintTextSync(`a();\n`, {
    cwd: path.join(__dirname, 'fixtures'),
    filename: path.join(__dirname, 'fixtures', 'test.js')
  })
  t.equal(typeof result, 'object', 'result is an object')
  t.equal(result.errorCount, 1, '1 error')
  t.equal(result.results[0].messages[0].message, "'a' is not defined.", 'first message')
})
