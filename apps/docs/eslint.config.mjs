import gvseslint from '@glasshouse/style-guide/eslint';
import tsparser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
	...gvseslint.configs.flat.browser,
	...gvseslint.configs.flat.react,
	...gvseslint.configs.flat.typescript,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				React: true,
				JSX: true,
			},
		},
		rules: {
			camelcase: ['error', { allow: ['^UNSAFE_', '^Geist_'], ignoreDestructuring: false, properties: 'never' }],
		},
	},
	{
		ignores: ['**/*.config.js', '**/*.config.mjs'],
	},
	{
		files: ['src/App.tsx', '.storybook/main.ts', '.storybook/preview.tsx', 'vite.config.ts', 'tailwind.config.ts'],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];

export default eslintConfig;
