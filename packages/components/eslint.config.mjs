import gvseslint from '@glasshouse/style-guide/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...gvseslint.configs.flat.browser,
	...gvseslint.configs.flat.react,
	...gvseslint.configs.flat.typescript,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			camelcase: ['error', { allow: ['^MRT_'] }],
			'react/jsx-pascal-case': [
				'warn',
				{
					ignore: ['MRT_*', 'Memo_MRT_*'],
				},
			],
		},
	},
	{
		ignores: ['*.js', '*config.mjs', '*config.ts', '**/*.stories.ts', '**/*.stories.tsx'],
	},
];
