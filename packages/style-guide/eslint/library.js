const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ['eslint:recommended', require.resolve('@vercel/style-guide/eslint/typescript'), 'prettier', './base.js'],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		node: true,
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		'.*.js',
		'.*.cjs',
		'.*.mjs',
		'node_modules/',
		'dist/',
	],
	overrides: [
		{
			files: ['*.js?(x)', '*.ts?(x)'],
		},
	],
};
