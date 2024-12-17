const disabledRules = {
	'react/function-component-definition': 'off',
	'import/order': 'off',
	'import/no-default-export': 'off',
	'tsdoc/syntax': 'off',
	'@typescript-eslint/explicit-function-return-type': 'off',
	'import/no-extraneous-dependencies': 'off',
	'jsx-a11y/no-autofocus': 'off',
	'import/no-cycle': 'off',
	'no-shadow': 'off',
	'no-unused-vars': 'off',
	'import/named': 'off',
	'no-bitwise': 'off',
};

module.exports = {
	plugins: ['simple-import-sort', 'eslint-plugin-react-compiler'],
	rules: {
		...disabledRules,
		'react-compiler/react-compiler': 'error',
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react', '^@?\\w'],
					['^(@components)(/.*|$)', '^\\.((?!.(css|scss)).)*$', '^(@lib)(/.*|$)', '^(@utils)(/.*|$)'],
					['^[^.]'],
				],
			},
		],
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowNumber: true,
			},
		],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		'no-console': ['error', { allow: ['error', 'warn'] }],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			{ blankLine: 'always', prev: '*', next: ['if', 'try', 'switch', 'for', 'while'] },
			{ blankLine: 'always', prev: ['if', 'try', 'switch', 'for', 'while'], next: '*' },
		],
	},
};
