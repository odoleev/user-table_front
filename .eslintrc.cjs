module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        "react/react-in-jsx-scope": 0,
        "import/prefer-default-export": "off",
        "jsx-a11y/label-has-associated-control": 0,
        "react/no-unescaped-entities": 0,
        "@typescript-eslint/default-param-last": 0,
        "array-callback-return": 0,
        "consistent-return": 0,
        "import/no-cycle": 0
    }
}
