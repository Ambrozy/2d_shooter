module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    env: {
        browser: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:compat/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/typescript',
        'prettier',
    ],
    parserOptions: {
		tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
		'quotes': ['error', 'single'],
		'no-param-reassign': 'error',
		'no-plusplus': 'off',
		'no-shadow': 'error',
		'no-use-before-define': 'error',
		'import/no-duplicates': 'error',
		'import/no-cycle': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-unused-modules': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-type': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variable',
				format: ['UPPER_CASE', 'camelCase'],
				types: ['boolean', 'number', 'string'],
			},
			{
				selector: 'variable',
				format: ['camelCase'],
				types: ['function'],
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false,
				},
			},
		],
        'comma-dangle': ['error', 'always-multiline'],
		'arrow-body-style': ['error', 'as-needed'],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			{ blankLine: 'any', prev: '*', next: 'return' },
		],
    },
	ignorePatterns: ['webpack.config.js'],
};
