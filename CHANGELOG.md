# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 3.3.0

- Upgrade all dependencies

## 3.2.0

- Auto detect if React is used and turn on `eslint-config-standard-react` and `eslint-plugin-react-hooks` rules, but turn off `react/prop-types` as that's really up to the project.

## 3.1.0

- Re-add `--fix` flag since some rules in standard (e.g. `lines-between-class-members`) are fixable, but not enforced by `prettier`. Such is the price for trying to bridge the two tools.
- Upgrade to eslint 6.3.0 and latest standard, the one that fixes `no-unused-vars` false positives
- Upgrade all other dependencies

## 3.0.2

- Revert eslint from `6.2.0 -> 6.1.0` until https://github.com/eslint/eslint/issues/12117 is fixed

## 3.0.0

- Upgrade to `standard@14` (previously `standard@12`)
- Upgrade all other dependencies

## 2.0.0

Huge thanks to @sheerun for all the feedback on V1. This version comes with many improvements.

**tl;dr**

- Remove `--fix`
- Remove `--init`
- Remove `--verbose`
- Remove dependency on `prettier` making `healthier` formatter agnostic
- Use eslint output and add `--format`
- Allow extending with .eslintrc
- Support more environments, typescript, flow, react, vue
- Merge `.prettierignore` into default ignores

Long form:

- The `--fix` flag has been removed to make Healthier more focused on code quality linting and be unopinionated about your choice of formatter. This avoids installing 2 extra dependencies – prettier and eslint-plugin-prettier, which means installation is faster, but also the checks run faster since we avoid double parsing each file with eslint and then prettier. This makes Healthier a more friendlier and less confusing tool when using it with prettierx, prettier-standard or any other formatter. This will also avoid any version conflicts between the Prettier used in your project and the Prettier that was used in Healthier to lint the style. Inline with this, the `--init` flag has been removed too, because it really is not in scope for Healthier to dictate stype preference when Healthier is a pure style agnostic linter.
- The output is now formatted using eslint's formatters and accepts any eslint `--format` option. This means a nicer looking default output, but also better integration with existing tooling since eslint format is more widely used. Incidentally, this helps to improve SublimeLinter-contrib-healthier plugin greatly. It's now a little bit faster and more comprehensive, it displays syntax errors and internal eslint errors, such as information about missing plugins.
- It's possible to extend eslint rules used by creating `.eslintrc` (or any other form that eslint supports). Previously, it was already possible to pass `--global`, `--env` and `--plugin` via command line argument or `package.json` field in `healthier` key. But now it's also possible to use `.eslintrc` which allows granular rule overrides or using plugin rules such as `react-native` or `react-a11y` without having to eject from the tool.
- All of the `eslint-config-prettier` rules are being imported to ensure that styling related rules are turned off even when you're using typescript, vue, and other supported environments.
- `.prettierignore` is now taken into account as part of the ignores, if you're not formatting that code, you probably also don't want to be linting it.
- `--verbose` flag was removed since the output now includes the rule names depending on the `--format` used

## 1.1.2

- Fix dependencies, explicitly depend on minimist and get-stdin

## 1.1.1

- No changes to code, only updated README.

## 1.1.0

- **Feature** Add `--init` flag that creates an opinionated, `standard` inspired `.prettierrc` file.

## 1.0.0

Combine the best parts of eslint, prettier and standard into a single package that can format and lint your code.
