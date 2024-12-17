const globals = require('globals');
const base = require('./_base');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	...base,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
