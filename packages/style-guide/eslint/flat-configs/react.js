const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const eslintConfigPrettier = require('eslint-config-prettier');
const jsxA11yRules = require('./rules/jsx-a11y');
const reactRules = require('./rules/react');
const reactCompiler = require('eslint-plugin-react-compiler');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	importPlugin.flatConfigs.recommended,
	jsxA11y.flatConfigs.recommended,
	eslintConfigPrettier,
	{
		name: '@glasshouse/eslint-config-react',
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		plugins: {
			'react-hooks': reactHooks,
			'react-compiler': reactCompiler,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...reactRules.rules,
			...jsxA11yRules.rules,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
