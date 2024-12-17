const babelParser = require('@babel/eslint-parser');
const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');
const { ECMA_VERSION, JAVASCRIPT_FILES } = require('./_constants.js');
const bestPractice = require('./rules/best-practice.js');
const comments = require('./comments.js');
const es6 = require('./rules/es6.js');
const importConfig = require('./rules/import.js');
const possibleErrors = require('./rules/possible-errors.js');
const stylistic = require('./rules/stylistic.js');
const variables = require('./rules/variables.js');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	eslintConfigPrettier,
	bestPractice,
	...comments,
	es6,
	importConfig,
	possibleErrors,
	stylistic,
	variables,
	{
		name: '@glasshouse/eslint-config-base',
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		ignores: ['!.*.js'],
		settings: {
			// Use the Node resolver by default.
			'import/resolver': { node: {} },
		},
		languageOptions: {
			globals: {
				...globals[`es${ECMA_VERSION}`],
			},
			parserOptions: {
				ecmaVersion: ECMA_VERSION,
				sourceType: 'module',
			},
		},
		rules: disabledRules,
	},
	{
		files: JAVASCRIPT_FILES,
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
			},
		},
	},
	{
		files: [
			'*.config.cjs',
			'*.config.js',
			'*.config.mjs',
			'*.config.ts',
			'**/*.d.ts',
			'**/*.stories.ts',
			'**/*.stories.tsx',
			'app/**/*error.tsx',
			'app/**/layout.tsx',
			'app/**/not-found.tsx',
			'app/**/opengraph-image.tsx',
			'app/**/page.tsx',
			'app/apple-icon.tsx',
			'app/robots.ts',
			'app/sitemap.ts',
			'next.config.mjs',
			'src/app/**/*error.tsx',
			'src/app/**/layout.tsx',
			'src/app/**/not-found.tsx',
			'src/app/**/opengraph-image.tsx',
			'src/app/**/page.tsx',
			'src/app/apple-icon.tsx',
			'src/app/robots.ts',
			'src/app/sitemap.ts',
		],
		rules: {
			'import/no-default-export': 'off',
			'import/prefer-default-export': ['error', { target: 'any' }],
		},
	},
];
