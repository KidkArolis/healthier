module.exports = {
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    'prettier/unicorn',
    'prettier/vue',
  ],
  plugins: ['react-hooks'],
  rules: {
    // turn this off since it's really up to the project
    'react/prop-types': 'off',

    // turn on only the rules of hooks,
    // the exhaustive deps give too many false positives
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    // turn on some extra rules from eslint-config-react-app
    // that are not already turned on in eslint-config-standard-jsx
    'react/no-typos': 'error',
    'react/require-render-return': 'error',
    'react/style-prop-object': 'error',
    'react/no-direct-mutation-state': 'warn',
    'react/no-danger-with-children': 'error',
  },
}
