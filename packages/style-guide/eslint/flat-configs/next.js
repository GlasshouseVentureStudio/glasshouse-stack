const requirePackage = require('../utils/require-package');
const { JAVASCRIPT_FILES } = require('./_constants');
const nextPlugin = require('@next/eslint-plugin-next');
const { fixupPluginRules } = require('@eslint/compat');

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

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	{
		plugins: {
			'@next/next': fixupPluginRules(nextPlugin),
		},
		rules: nextPlugin.configs.recommended.rules,
	},
	{
		files: JAVASCRIPT_FILES,
		languageOptions: {
			parserOptions: { babelOptions },
		},
	},
];
