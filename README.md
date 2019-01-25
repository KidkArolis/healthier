# Healthier

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

An opinionated code linter – a friendly companion to Prettier.

## Why?

Prettier is a powerful code formatter. However, linting your code in addition to formatting can reveal a number of code quality issues and potential bugs.

Healthier is a code linter that you should run in addition to formatting your code with Prettier to find the most common issues with your code. It saves you having to install or configure any of the 100s of eslint rules by hand.

Healthier delegates all of the code style related decisions to [Prettier][prettier/prettier] and all of the code quality related decisions to [Standard][standard/standard]. The community has put a lot of effort into those tools and Healthier simply helps you get the benefits of both.

The goal is to avoid creating yet another linter or another set of rules and instead reuse well established existing options in an easy to use workflow.

## Why not just use Prettier with Standard?

Standard is not only checking your code quality, but also your code style. Unfortunately Prettier and Standard code styles are incompatible in subtle ways. This means you can't use the two tools together. There exist [other][prettier-standard] [approaches][prettierx] to solving this problem, but they have to resort to forking and modifying Prettier to make it format code more closely to Standard's style. While that's a valid approach, it can cause difficulties in using the tools and extensions in the Prettier ecosystem and I'm worried about longer term sustainability and compatibility of this approach. Healthier, on the other hand, completely lets go off Standard's code style in favor of Prettier's and combines the best aspects of each tool:

1. Use Prettier to format your JavaScript, CSS and other files.
2. Use Healthier to lint your JavaScript for code quality issues.
3. Use Healthier to ensure all relevant files have indeed been formatted with Prettier.
4. Use Healthier's zero config approach – no glob patterns necessary, no eslint plugins, no manual rule configuration.

You can create a `.prettierrc` file in your project with the following content to bring your code style pretty close to Standard. Use `healthier --init` to create this exact config:

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

Optionally use `--init` to generate `.prettierrc` inspired by Standard:

```
$ npx healthier --init
```

Then run in your project:

```
$ npx healthier
healthier: Friendly linter
  pages/index.js:9:3: 'useState' is not defined.
```

Or pass `--fix` to format your code using Prettier, which will also log the linting errors that can not be fixed:

```
$ npx healthier --fix
```

The `--fix` command is a convenient shortcut which means you don't even need to install Prettier to format your code. But in practise, you might want to install and use Prettier directly side by side with healthier, so that you get the best code editor integration and format other file formats, such as json and css.

Note: `npx` prefix can be ommitted if you have `./node_modules/.bin` in your `PATH`.

## Recommended setup

The recommended setup is to install both Prettier and Healthier and configure them in `package.json`:

```json
{
  "name": "my-cool-package",
  "devDependencies": {
    "healthier": "*",
    "prettier": "*"
  },
  "scripts": {
    "test": "healthier && ava",
    "format": "prettier --write '**/*.{js,json,css}'"
  }
}
```

Now, if you use Prettier and Healthier code editor extensions, you will get both auto formatting and linting working in tandem. And additionally, in CI, `npm test` will warn you if something was not formatted with Prettier.

## Editor plugins

- [Sublime Text – SublimeLinter-contrib-healthier](./docs/01-sublime-text.md) (Coming soon)
- [VSCode – Healthier Linter](./docs/02-vscode.md) (Coming soon)
- [Vim – Syntastic](./docs/03-vim.md)

## Rules

Healthier is based on `standard-engine` which in itself is based on `eslint`. Healthier combines the following eslint config rules and plugins:

- eslint-config-standard
- eslint-config-standard-jsx
- eslint-config-prettier
- eslint-plugin-prettier – to format code when using `--fix` flag

Which in turn depend on the following plugins:

- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-prettier
- eslint-plugin-promise
- eslint-plugin-react
- eslint-plugin-standard

That's a lot of things you don't need to install!

## Configuration

Healthier can be configured in `package.json` in `healthier` field.

### Custom Parser

Using a custom parser is sometimes necessary when using futuristic JS features. To use one, install it from npm (e.g. `npm install babel-eslint`) and configure it in your package.json:

```json
{
  "healthier": {
    "parser": "babel-eslint"
  }
}
```

### Ignoring files

Just like in Standard, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders (beginning with `.`), and all patterns in a project's root `.gitignore` file are automatically excluded when looking for `.js` files to check.

Sometimes you need to ignore additional folders or specific minfied files. To do that, add
a `healthier.ignore` property to `package.json`:

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

### Using Flow or TypeScript

Follow Standard's documentation on this, but replace `standard` with `healthier`: https://github.com/standard/standard#can-i-use-a-javascript-language-variant-like-flow-or-typescript.

### Other Options

In fact, make sure to check out all of [Standard configuration options][standard/standard]. Since Healthier is based on `standard-engine` all of the same features apply.

## Configuring Prettier

When using `--fix`, Prettier is executed via eslint plugin and will follow the usual Prettier Config rules. You can use `.prettierrc`, to use `"semi": false` or `"singleQutoe": true` as usual. See https://prettier.io/docs/en/configuration.html for more information.

## Ejecting

If you would like to stop using Healthier and switch to eslint whilst preserving all of the Healthier functionality, [follow this guide](./docs/04-ejecting.md).

[travis-image]: https://img.shields.io/travis/KidkArolis/healthier.svg?style=flat-square
[travis-url]: https://travis-ci.org/KidkArolis/healthier
[npm-image]: https://img.shields.io/npm/v/healthier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/healthier
[downloads-image]: https://img.shields.io/npm/dm/healthier.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/healthier
[prettier/prettier]: https://github.com/prettier/prettier
[standard/standard]: https://github.com/standard/standard
[prettier-standard]: https://github.com/sheerun/prettier-standard
[prettierx]: https://github.com/brodybits/prettierx
