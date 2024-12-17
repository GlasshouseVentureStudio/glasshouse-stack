const { FlatCompat } = require('@eslint/eslintrc');
const requirePackage = require('../utils/require-package');
const { JAVASCRIPT_FILES } = require('./_constants');

requirePackage('next', '@next/eslint-plugin-next');

const babelOptions = {
	presets: (() => {
		try {
			require.resolve('next/babel');
			return ['next/babel'];
		} catch {
			return [];
		}
	})(),
};

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	...compat.config({
		extends: ['plugin:@next/next/recommended'],
	}),
	{
		files: JAVASCRIPT_FILES,
		languageOptions: {
			parserOptions: { babelOptions },
		},
	},
];
