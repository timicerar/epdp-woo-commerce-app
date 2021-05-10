module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "prettier",
        "simple-import-sort"
    ],
    "rules": {
        "@typescript-eslint/explicit-module-boundary-types": [
            "off"
        ],
        "@typescript-eslint/no-floating-promises": [
            "off"
        ],
        "@typescript-eslint/no-unsafe-assignment": [
            "off"
        ],
        "@typescript-eslint/ban-types": [
            "off"
        ],
        "prettier/prettier": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-empty-function": "off",
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    [
                        "^react",
                        "^\\u0000",
                        "^@?\\w",
                        "^[^.]",
                        "^\\."
                    ]
                ]
            }
        ],
        "@typescript-eslint/no-empty-function": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
