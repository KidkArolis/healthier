# Vim

## ALE (recommended)

Install **[ALE][vim-1]** and add these lines to `.vimrc`:

```vim
let g:ale_javascript_eslint_executable = 'healthier'
let g:ale_linters = {
\   'javascript': ['eslint'],
\}
```

## Syntastic

Install **[Syntastic][vim-2]** and add these lines to `.vimrc`:

```vim
let g:syntastic_javascript_checkers=['eslint']
let g:syntastic_javascript_eslint_exec = 'healthier'
```

[vim-1]: https://github.com/dense-analysis/ale
[vim-2]: https://github.com/scrooloose/syntastic
