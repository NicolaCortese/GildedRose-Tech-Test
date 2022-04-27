module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["eslint:recommended",'plugin:jest/recommended'],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        semi: [2, 'always'],
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
};
