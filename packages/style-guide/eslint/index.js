const { version } = require('../package.json');

module.exports = {
	meta: {
		name: '@glasshouse/eslint-config',
		version,
	},
	configs: {
		flat: {
			browser: require('./flat-configs/browser'),
			node: require('./flat-configs/node'),
			next: require('./flat-configs/next'),
			react: require('./flat-configs/react'),
			typescript: require('./flat-configs/typescript'),
		},
		legacy: {
			base: require('./configs/base'),
			library: require('./configs/library'),
			next: require('./configs/next'),
			react: require('./configs/react'),
		},
	},
};
