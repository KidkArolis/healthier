var pkg = require('./package.json')

module.exports = {
  cmd: pkg.name,
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: 'Friendly linter',
  eslint: require('eslint'),
  eslintConfig: {
    baseConfig: require('./eslintrc'),
    useEslintrc: true
  }
}
