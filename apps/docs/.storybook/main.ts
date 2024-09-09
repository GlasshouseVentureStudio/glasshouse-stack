import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../../../packages/components/src/**/*.mdx',
		'../../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../../../packages/components/CHANGELOG.md',
	],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('storybook-dark-mode'),
		getAbsolutePath('@storybook/test-runner'),
		{
			name: '@storybook/addon-coverage',
			options: {
				istanbul: {
					// Fixes https://github.com/storybookjs/addon-coverage/issues/35
					include: ['**/stories/**'],
				},
			},
		},
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
};

export default config;
