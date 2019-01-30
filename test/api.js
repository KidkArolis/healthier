const test = require('tape')
const healthier = require('../')

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
  const result = healthier.lintTextSync(`a();\n`)
  t.equal(typeof result, 'object', 'result is an object')
  t.equal(result.errorCount, 1, '1 error')
  t.equal(result.results[0].messages[0].message, "'a' is not defined.", 'first message')
})
