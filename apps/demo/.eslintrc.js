const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
	root: true,
	extends: [require.resolve('@glasshouse/style-guide/eslint/next')],
	parserOptions: {
		project,
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
};
