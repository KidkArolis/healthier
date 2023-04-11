# Healthier

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![Join the chat at https://gitter.im/healthier-linter/community](https://badges.gitter.im/healthier-linter/community.svg)](https://gitter.im/healthier-linter/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An opinionated code style agnostic linter – a friendly companion to Prettier.

## Why?

Prettier is a powerful code formatter. However, linting your code in addition to formatting can reveal a number of code quality issues and potential bugs.

Healthier is a code linter that you should run in addition to formatting your code with Prettier to find the most common issues with your code. It saves you having to install or configure any of the 100s of ESLint rules by hand or hand pick the plugins to use.

Healthier delegates all of the code quality related decisions to [Standard][standard/standard]. The community has put a lot of effort into that project and Healthier simply helps you get the benefits of it when using a different code style, such as Prettier.

The goal is to avoid creating yet another opinionated set of rules and instead reuse well established existing options in an easy to use workflow.

Because Healthier is only concerned with code quality linting, it means you can use any code formatter, such as Prettier or any of it's variants like [prettierx][prettierx] or [prettier-standard][prettier-standard].

## Why not just use Prettier with Standard?

Standard is not only checking your code quality, but also your code style. Unfortunately Prettier and Standard code styles are incompatible in subtle ways. This means you can't use the two tools together. Healthier completely lets go off Standard's code style in favor of Prettier's and combines the best aspects of each tool:

1. Use Prettier to format your JavaScript, CSS and other files.
2. Use Healthier to lint your JavaScript for code quality issues.
3. Benefit from Healthier's Standard inspired zero config approach – no glob patterns necessary, no ESLint plugins, no manual rule configuration.

You can create a `.prettierrc` file in your project with the following content to bring your code style pretty close to Standard:

```
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 120
}
```

## Usage

```
npm install healthier
```

Then run in your project:

```
$ npx healthier

/App.js
  4:1  error  'useState' is not defined  no-undef

✖ 1 problem (1 error, 0 warnings)
```

Note: `npx` prefix can be omitted if you have `./node_modules/.bin` in your `PATH`.

## Recommended setup

The recommended setup is to install Prettier and Healthier and configure them in `package.json`:

```json
{
  "name": "my-cool-package",
  "scripts": {
    "test": "ava && healthier && prettier --check '**/*.{js,json,css}'",
    "format": "prettier --write '**/*.{js,json,css,yml}'"
  },
  "devDependencies": {
    "healthier": "*",
    "prettier": "*"
  }
}
```

When you use Prettier and Healthier code editor extensions, you will get both auto formatting and linting working in tandem. And in CI, `npm test` will warn you about missed code quality issues or if something was not formatted with Prettier.

## Editor plugins

- [Sublime Text](./docs/01-sublime-text.md)
- [VSCode](./docs/02-vscode.md)
- [Vim](./docs/03-vim.md)

## Rules

Healthier is based on `standard-engine` which in itself is based on `eslint`. Healthier combines the following ESLint config rules and plugins:

- eslint-config-standard
- eslint-config-standard-jsx
- eslint-config-prettier

Which in turn depend on the following plugins:

- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-react
- eslint-plugin-standard

That's a lot of things you don't need to install!

## Configuration

Healthier can be configured in `package.json` in `healthier` field.

### Custom Parser

Using a custom parser is sometimes necessary when using futuristic JS features. To use one, install it from npm (e.g. `npm install @babel/eslint-parser`) and configure it in your package.json:

```json
{
  "healthier": {
    "parser": "@babel/eslint-parser"
  }
}
```

## Automatic formatter

There exist certain `standard` rules that `prettier` has no opinion about. For example the `lines-between-class-members` rule is turned on by `standard` to improve readability by enforcing lines between class members. However `prettier` allows class members without lines in between. In these cases you can get healthier to fix those issues for you:

You can use `healthier --fix` to fix such issues automatically.

### Ignoring files

Just like in Standard, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders (beginning with `.`), and all patterns in a project's root `.gitignore` file are automatically excluded when looking for `.js` files to check. Additionally everything in `.prettierignore` is also ignored, since if you're not formatting something, you probably don't want to lint it.

Sometimes you need to ignore additional folders or specific minified files. To do that, add a `healthier.ignore` property to `package.json`:

```json
"healthier": {
  "ignore": [
    "**/out/",
    "/lib/select2/",
    "/lib/ckeditor/",
    "tmp.js"
  ]
}
```

### Globals

If you want to allow certain globals, configure like so:

```json
{
  "healthier": {
    "globals": ["describe", "it"]
  }
}
```

### TypeScript

To use TypeScript, you need to run Healthier with `@typescript-eslint/parser` as the parser, `@typescript-eslint/eslint-plugin` as a plugin, and tell Healthier to lint `*.ts` files (since it doesn't by default).

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Then run:

```bash
$ healthier --parser @typescript-eslint/parser --plugin @typescript-eslint *.ts
```

Or, add this to `package.json`:

```json
{
  "healthier": {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"]
  }
}
```

With that in `package.json`, you can run:

```bash
healthier *.ts
```

### Flow

To use Flow, you need to run Healthier with `@babel/eslint-parser` as the parser and`eslint-plugin-flowtype` as a plugin.

```bash
npm install --save-dev @babel/eslint-parser eslint-plugin-flowtype
```

Then run:

```bash
$ standard --parser @babel/eslint-parser --plugin flowtype
```

Or, add this to `package.json`:

```json
{
  "standard": {
    "parser": "@babel/eslint-parser",
    "plugins": ["flowtype"]
  }
}
```

### ESLint Environments

ESLint has an [environment](http://eslint.org/docs/user-guide/configuring.html#specifying-environments) feature that defines what global variables are allowed to be used. For a list of what globals are available for these environments, check the [globals](https://github.com/sindresorhus/globals/blob/master/globals.json) npm module.

For example, to support mocha global variables in test files, add this to the top of the test files:

```js
/* eslint-env mocha */
```

Or, run:

```bash
$ healthier --env mocha
```

### Extending ESLint Rules

Healthier allows extending ESLint rules by creating `.eslintrc` file. For full documentation see [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

For example, to make snake_case allowed in your code, set the following in your `.eslintrc`:

```
{
  "rules": {
    "camelcase": 0
  }
}
```

You can also use this method to extend other configs and plugins, for example, to use `standard-react` and `jsx-a11y` when developing a React application, install the following:

```
npm i -D eslint-config-standard-react eslint-plugin-jsx-a11y
```

And put this in your `.eslintrc`:

```json
{
  "extends": ["plugin:jsx-a11y/strict", "standard-react"]
}
```

## Ejecting

To stop using Healthier and switch to pure ESLint while preserving most of Healthier's functionality, [follow this guide](./docs/04-ejecting.md).

[npm-image]: https://img.shields.io/npm/v/healthier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/healthier
[downloads-image]: https://img.shields.io/npm/dm/healthier.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/healthier
[prettier/prettier]: https://github.com/prettier/prettier
[standard/standard]: https://github.com/standard/standard
[prettier-standard]: https://github.com/sheerun/prettier-standard
[prettierx]: https://github.com/brodybits/prettierx
