import gvseslint from '@glasshouse/style-guide/eslint';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
	...gvseslint.configs.flat.browser,
	...gvseslint.configs.flat.react,
	...gvseslint.configs.flat.typescript,
	...gvseslint.configs.flat.next,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				React: true,
				JSX: true,
			},
		},
		ignores: ['*.config.mjs'],
		rules: {
			camelcase: ['error', { allow: ['^UNSAFE_', '^Geist_'], ignoreDestructuring: false, properties: 'never' }],
		},
	},
];

export default eslintConfig;