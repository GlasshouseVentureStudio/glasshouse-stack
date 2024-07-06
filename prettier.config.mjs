/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */
const overridableDefaults = {
	endOfLine: 'lf',
	tabWidth: 2,
	printWidth: 120,
	useTabs: true,
};

/** @type import('prettier').Config */
const config = {
	...overridableDefaults,
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	jsxSingleQuote: true,
	quoteProps: 'as-needed',
	semi: true,
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'es5',
	plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-packagejson'],
	tailwindFunctions: ['cn', 'tv', 'cx', 'clsx', 'cva'],
};

export default config;
