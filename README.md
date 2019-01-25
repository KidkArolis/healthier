# Healthier

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

An opinionated code linter – a friendly companion to prettier.

## Why?

Prettier is a powerful code formatter. But linting your code can reveal a number of code quality issues and potential bugs.

Healthier is a code linter that you can run in addition to Prettier to find the most common issues with your code without having to install or configure any of the 100s of eslint rules by hand.

Healthier delegates all of the code style related decisions to [Prettier](https://github.com/prettier/prettier) and all of the code quality related decisions to [Standard](https://github.com/standard/standard). The community has put a lot of effort into those tools and Healthier simply helps you combine the best of both.

The goal is to avoid creating yet another linter or another set of rules and instead reuse well established existing options in an easy to use workflow.

## Why not just use Prettier and Standard?

Standard is not only checking your code quality, but also your code style. Unfortunately Prettier's and Standard's code styles are incompatible in subtle ways. This means you can't use the two tools together. There exist other approaches to solving this problem, but they modify prettier to make it format code into standard style. While that's an ok option, it can cause difficulties in using the tools and extensions in the Prettier ecosystem. Healthier, on the other hand, completely lets go off Standard's code style in favor of Prettier's.

You can create a `.prettierrc` file in your project with the following content to bring your code style pretty close to Standard:

```
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true
}
```

## Usage

```
npm install healthier
```

Then run in your project:

```
$ healthier
healthier: Friendly linter
  pages/index.js:9:3: 'useState' is not defined.
```

Or pass `--fix` to format your code using prettier, which will also log the linting errors that can not be fixed:

```
$ healthier --fix
```

## Rules

Healthier is based on `standard-engine` which in itself is based on `eslint`. Healthier combines the following eslint config rules:

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

### Configuring prettier

You can configure prettier, for example, to use `"semi": false` or `"singleQutoe": true` as usual using `.prettierrc` file. See https://prettier.io/docs/en/configuration.html.

### Editor plugins

Coming soon to Sublime, VSCode and Atom!

### Recommended setup

Add it to `package.json`.

```json
{
  "name": "my-cool-package",
  "devDependencies": {
    "healthier": "*"
  },
  "scripts": {
    "test": "healthier && ava",
    "format": "healthier --fix"
  }
}
```

### Custom Parser

To use a custom parser, install it from npm (example: `npm install babel-eslint`) and add it to your package.json, this is sometimes necessary when using futuristic JS features:

```json
{
  "healthier": {
    "parser": "babel-eslint"
  }
}
```

### [Vim](http://www.vim.org/)

Install **[Syntastic][vim-1]** and add these lines to `.vimrc`:

```vim
let g:syntastic_javascript_checkers=['standard']
let g:syntastic_javascript_standard_exec = 'healthier'
```

For automatic formatting on save, add these two lines to `.vimrc`:

```vim
autocmd bufwritepost *.js silent !healthier % --fix
set autoread
```

[vim-1]: https://github.com/scrooloose/syntastic

### Ignoring files

Just like in `standard`, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders
(beginning with `.`), and all patterns in a project's root `.gitignore` file are
automatically excluded when looking for `.js` files to check.

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

[travis-image]: https://img.shields.io/travis/KidkArolis/healthier.svg?style=flat-square
[travis-url]: https://travis-ci.org/KidkArolis/healthier
[npm-image]: https://img.shields.io/npm/v/healthier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/healthier
[downloads-image]: https://img.shields.io/npm/dm/healthier.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/healthier
[standard/standard]: https://github.com/standard/standard
