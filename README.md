# pretty-standard

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

JavaScript `standard` lint rules with `prettier` style and formatting.

## Why?

Write up coming soon.. **tl;dr** standard is an opinionated linter, prettier is an opinionated formatter. Both tools are great and very comprehensive. All of the `eslint`, `standard` and `prettier` have been engineered impressively well and are very pluggable. This package just puts them all together in a way that works out of the box so you don't have to.

## Install

```
npm install pretty-standard
```

## Rules

All non style related `standard` rules which leaves code style to `prettier`. More specifically this package combines the following:

- eslint-config-standard
- eslint-config-standard-jsx
- eslint-config-prettier
- eslint-plugin-prettier – to format code when using `--fix` flag

## Usage

Install globally or locally with:

```bash
npm install pretty-standard
npm install pretty-standard -g
```

Then run in your project, the typical standard defaults and ignores apply:

```
$ pretty-standard
pretty-standard: Standard eslint rules with prettier formatting
  pages/index.js:9:3: 'useState' is not defined.
```

Or pass `--fix` to format your code using prettier, which will also log the linting errors that can not be fixed by prettier:

```
$ pretty-standard --fix
```

### Editor plugins

Coming soon to Sublime, VSCode and Atom!

### Recommended setup

Add it to `package.json`.

  ```json
  {
    "name": "my-cool-package",
    "devDependencies": {
      "pretty-standard": "*"
    },
    "scripts": {
      "test": "pretty-standard && ava",
      "format": "pretty-standard --fix"
    }
  }
  ```

### Custom Parser
To use a custom parser, install it from npm (example: `npm install babel-eslint`) and add it to your package.json, this is sometimes necessary when using futuristic JS features:

```json
{
  "pretty-standard": {
    "parser": "babel-eslint"
  }
}
```

### [Vim](http://www.vim.org/)

Install **[Syntastic][vim-1]** and add these lines to `.vimrc`:

```vim
let g:syntastic_javascript_checkers=['standard']
let g:syntastic_javascript_standard_exec = 'pretty-standard'
```

For automatic formatting on save, add these two lines to `.vimrc`:

```vim
autocmd bufwritepost *.js silent !pretty-standard % --fix
set autoread
```

[vim-1]: https://github.com/scrooloose/syntastic

### Ignoring files

Just like in `standard`, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders
(beginning with `.`), and all patterns in a project's root `.gitignore` file are
automatically excluded when looking for `.js` files to check.

Sometimes you need to ignore additional folders or specific minfied files. To do that, add
a `pretty-standard.ignore` property to `package.json`:

```json
"pretty-standard": {
  "ignore": [
    "**/out/",
    "/lib/select2/",
    "/lib/ckeditor/",
    "tmp.js"
  ]
}
```

### Make it look `snazzy`

If you want prettier output, install [`snazzy`](https://github.com/standard//snazzy) package and pipe `pretty-standard` to it:

```bash
$ pretty-standard --verbose | snazzy
```

See [standard/standard] for more information.

[travis-image]: https://img.shields.io/travis/KidkArolis/pretty-standard.svg?style=flat-square
[travis-url]: https://travis-ci.org/KidkArolis/pretty-standard
[npm-image]: https://img.shields.io/npm/v/pretty-standard.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pretty-standard
[downloads-image]: https://img.shields.io/npm/dm/pretty-standard.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/pretty-standard
[standard/standard]: https://github.com/standard/standard
