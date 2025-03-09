const vitest = require('@vitest/eslint-plugin');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	{
		files: ['tests/**'], // or any other pattern
		plugins: {
			vitest,
		},
		rules: vitest.configs.recommended.rules,
	},
];
