module.exports = {
	extends: [require.resolve('@vercel/style-guide/eslint/node')],
	overrides: [
		{
			files: ['eslint/rules/**'],
			rules: {
				'sort-keys': 'error',
			},
		},
		{
			files: ['**/index.js'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
};
