const path = require('path');
module.exports = {
"parser": "babel-eslint",
"extends": "airbnb",
settings: {
  'import/resolver': {
    node: {
      paths: [path.resolve(__dirname, './src')],
    },
  },
},
"env": {
  "browser": true,
  "node": true,
  "jest": true,
  "es6": true
},
"plugins": [
  "react",
],
"parserOptions": {
  "ecmaVersion": 6,
  "sourceType": "module",
  "ecmaFeatures": {
    "jsx": true
  }
},
"rules": {
  "arrow-parens": [
    "error",
    "always"
  ],

  "arrow-body-style": [
    2,
    "as-needed"
  ],
  "comma-dangle": [
    2,
    "always-multiline"
  ],
  "indent": [
    2,
    2,
    {
      "SwitchCase": 1
    }
  ],
  "newline-per-chained-call": 0,
  "no-confusing-arrow": 0,
  "no-console": 1,
  "no-use-before-define": 0,
  "prefer-template": 2,
  "class-methods-use-this": 0,
  "react/forbid-prop-types": 0,
  "react/jsx-first-prop-new-line": [
    2,
    "multiline"
  ],
  "linebreak-style": 0,
  "no-underscore-dangle": [0, { "allow": [] }],
  "react/destructuring-assignment": [0, { "extensions": [".jsx"] }],
  "react/prop-types": 0,
},
}