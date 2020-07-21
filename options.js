const resolve = require('resolve')
const pkg = require('./package.json')

module.exports = {
  cmd: pkg.name,
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: 'Friendly linter',
  eslint: require('eslint'),
  eslintConfig: {
    baseConfig: usingReact() ? require('./eslintrc-react') : require('./eslintrc'),
    useEslintrc: true,
  },
}

function usingReact() {
  try {
    const reactPath = resolve.sync('react', { basedir: process.cwd() })
    require(reactPath)
    return true
  } catch (e) {
    return false
  }
}
