const node = require('./eslint/flat-config/node');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	...node,
	{
		files: ['eslint/rules/**'],
		rules: {
			'sort-keys': 'error',
		},
	},
	{
		files: ['**/index.js', '.*.js', '.*.cjs', '.*.mjs', 'node_modules/', 'dist/'],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];
