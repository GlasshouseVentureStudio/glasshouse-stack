/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@glasshouse/eslint-config/react.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	rules: {
		camelcase: ['error', { allow: ['^MRT_'] }],
	},
};
