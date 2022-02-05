const fs = require('fs')
const path = require('path')
const findRoot = require('find-root')

module.exports = function prettierIgnore() {
  let prettierIgnore
  try {
    const root = findRoot(process.cwd())
    prettierIgnore = fs.readFileSync(path.join(root, '.prettierignore'), 'utf8')
  } catch (e) {}
  if (prettierIgnore) prettierIgnore = prettierIgnore.split(/\r?\n/)
  return prettierIgnore
}
