/** @type {import('prettier').Config} */
module.exports = {
	bracketSpacing: true,
	jsxSingleQuote: true,
	printWidth: 120,
	semi: true,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['tv'],
};
