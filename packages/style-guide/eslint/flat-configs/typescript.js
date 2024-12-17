const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const eslintConfigPrettier = require('eslint-config-prettier');
const { TYPESCRIPT_FILES } = require('./_constants');
const typescriptRules = require('./rules/typescript');
const typescriptExtensionRules = require('./rules/typescript/extension');
const typescriptImportRules = require('./rules/typescript/import');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	importPlugin.flatConfigs.typescript,
	eslintConfigPrettier,
	{
		files: TYPESCRIPT_FILES,
	},
	typescriptRules,
	typescriptExtensionRules,
	typescriptImportRules,
];
