var path = require('path')
var pkg = require('./package.json')

var usingPrettier = false
try {
  require('prettier/package.json')
  usingPrettier = true
} catch (err) {}

module.exports = {
  // cmd, homepage, bugs all pulled from package.json
  cmd: 'healthier',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: 'Friendly linter',
  eslint: require('eslint'),
  eslintConfig: {
    configFile: usingPrettier ? path.join(__dirname, 'eslintrc.prettier.json') : path.join(__dirname, 'eslintrc.json')
  }
}
