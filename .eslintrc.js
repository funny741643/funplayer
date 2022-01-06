const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-empty-function": 0,
        "import/extensions": 0,
        "import/prefer-default-export": 0,
        "import/no-unresolved": 0,
        "no-restricted-exports": 0,
        "linebreak-style": ["error", "windows"],
        "no-underscore-dangle": OFF,
        "no-plusplus": 0,
        "no-console": 0,
        "no-unused-vars": 0,
        "no-undef": 0,
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        indent: ["error", 4],
    },
};
