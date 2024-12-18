const node = require('./eslint/flat-configs/node');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	...node,
	{
		files: ['eslint/flat-configs/rules/**'],
		rules: {
			'sort-keys': 'error',
		},
	},
	{
		files: ['**/index.js', '.*.js', '.*.cjs', '.*.mjs'],
		rules: {
			'import/no-default-export': 'off',
		},
	},
	{
		ignores: ['node_modules/', 'dist/', '**/*.d.ts'],
	},
];
