module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // 厳密等価演算子
    "eqeqeq": 2,
    // 連続スペースの許可
    "no-multi-spaces": 0,
    // 末尾セミコロンを強制
    "semi": [2, "always"],
    // const or let を強制
    "no-var": 2,
    // 再代入がない限り const を強制
    "prefer-const": 2,
    // カンマ位置は末尾に強制
    "comma-style": [2, "last"],
    // コロン揃える
    "key-spacing": [2, {
      "beforeColon" : false,
      "afterColon"  : true,
      "align"       : "colon"
    }],
    // カンマ前後のスペースを許可
    "comma-spacing": 0,
    // シングルクォート
    "quotes": ["error", "single"],
    // オブジェクトの括弧内のスペース
    "object-curly-spacing": ["error", "never", {"objectsInObjects": true}],
    // インデント
    "indent": 2,
    // any
    "@typescript-eslint/no-explicit-any": 0,
    // ブラケット前のスペース
    "space-before-blocks": ["error", {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],
  }
};
