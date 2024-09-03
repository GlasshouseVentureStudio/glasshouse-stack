/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [require.resolve('@glasshouse/style-guide/eslint/react')],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	rules: {
		camelcase: ['error', { allow: ['^MRT_'] }],
	},
	ignorePatterns: ['*.js', '*.stories.ts', '*.stories.tsx'],
};
