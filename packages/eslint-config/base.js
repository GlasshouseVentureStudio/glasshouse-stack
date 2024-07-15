const disabledRules = {
	'react/function-component-definition': 'off',
	'import/order': 'off',
	'import/no-default-export': 'off',
	'tsdoc/syntax': 'off',
	'@typescript-eslint/explicit-function-return-type': 'off',
	'import/no-cycle': 'off',
	'@typescript-eslint/no-shadow': 'off',
};

module.exports = {
	plugins: ['simple-import-sort'],
	rules: {
		...disabledRules,
		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': [
			'warn',
			{
				groups: [
					['^react', '^@?\\w'],
					['^(@components)(/.*|$)', '^\\.((?!.(css|scss)).)*$', '^(@lib)(/.*|$)', '^(@utils)(/.*|$)'],
					['^[^.]'],
				],
			},
		],
		'@typescript-eslint/restrict-template-expressions': [
			'warn',
			{
				allowNumber: true,
			},
		],
		'@typescript-eslint/no-misused-promises': [
			'warn',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		'no-console': ['warn', { allow: ['warn', 'error'] }],
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
