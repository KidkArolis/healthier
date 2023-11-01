# Ejecting

To stop using Healthier and use eslint directly, follow these steps:

1. Remove Healthier

```
npm uninstall healthier
```

2. Install a bunch of things

```
npm i eslint-config-standard eslint-config-standard-jsx eslint-config-standard-react eslint-config-prettier eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks
```

3. Create `eslintrc.js` with:

```
module.exports = {
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'prettier',
  ]
}
```

4. Update references to healthier in `package.json`

```
healthier -> eslint '**/*.js'
```

Note: the behaviour is slightly different wrt to ignored files. See README for which files Healthier ignores by default.
