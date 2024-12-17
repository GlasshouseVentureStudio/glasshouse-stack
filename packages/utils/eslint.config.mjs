import gvseslint from '@glasshouse/style-guide/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...gvseslint.configs.flat.browser,
	...gvseslint.configs.flat.node,
	...gvseslint.configs.flat.react,
	...gvseslint.configs.flat.typescript,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		ignores: ['eslint.config.mjs'],
	},
];
