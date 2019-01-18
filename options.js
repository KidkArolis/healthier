var path = require("path");
var pkg = require("./package.json");

module.exports = {
  // cmd, homepage, bugs all pulled from package.json
  cmd: "pretty-standard",
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: "Standard eslint rules with prettier formatting",
  eslint: require("eslint"),
  eslintConfig: {
    configFile: path.join(__dirname, "eslintrc.json")
  }
};
