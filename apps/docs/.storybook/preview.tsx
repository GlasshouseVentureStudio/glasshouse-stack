import { DEFAULT_THEME, MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';

import '@mantine/core/styles.css';
import '../src/index.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [render => <MantineProvider theme={DEFAULT_THEME}>{render()}</MantineProvider>],
};

export default preview;
