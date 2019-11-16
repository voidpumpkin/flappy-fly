module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['voidpumpkin/typescript.js', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 9
    },
    overrides: [
        {
            files: ['*.ts'],
            env: {
                browser: true
            }
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0
            }
        },
        {
            files: ['*.test.*'],
            env: {
                mocha: true
            }
        }
    ]
};
