module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['voidpumpkin', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0
            }
        }
    ]
};
