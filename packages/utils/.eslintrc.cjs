module.exports = {
	root: true,
	extends: [require.resolve('@glasshouse/style-guide/eslint/library')],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	plugins: ['only-warn'],
};
