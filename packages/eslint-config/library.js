const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'eslint:recommended',
		require.resolve('@vercel/style-guide/eslint/typescript'),
		'prettier',
		'turbo',
		'./base.js',
	],
	plugins: ['only-warn'],
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
		'node_modules/',
		'dist/',
	],
	overrides: [
		{
			files: ['*.js?(x)', '*.ts?(x)'],
		},
	],
};
