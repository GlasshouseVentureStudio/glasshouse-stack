import { DEFAULT_THEME, MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import '../src/index.css';

const preview: Preview = {
	parameters: {
		docs: {
			toc: true,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
		},
	},
	decorators: [
		render => {
			const queryClient = new QueryClient();

			return (
				<QueryClientProvider client={queryClient}>
					<MantineProvider theme={DEFAULT_THEME}>{render()}</MantineProvider>
				</QueryClientProvider>
			);
		},
	],
};

export default preview;
