const globals = require('globals');
const base = require('./_base');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	...base,
	{
		name: '@glasshouse/eslint-config-browser',
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
];
