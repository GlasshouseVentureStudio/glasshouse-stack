const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'eslint:recommended',
		'prettier',
		require.resolve('@vercel/style-guide/eslint/typescript'),
		require.resolve('@vercel/style-guide/eslint/browser'),
		require.resolve('@vercel/style-guide/eslint/react'),
		'turbo',
		'./base.js',
	],
	plugins: ['only-warn'],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		browser: true,
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
		// Force ESLint to detect .tsx files
		{ files: ['*.js?(x)', '*.ts?(x)'] },
	],
	rules: {
		'react/jsx-sort-props': [
			2,
			{
				ignoreCase: true,
				callbacksLast: false,
				reservedFirst: true,
			},
		],
	},
};
