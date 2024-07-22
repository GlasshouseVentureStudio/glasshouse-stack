import { MantineColor, MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import 'mantine-react-table/styles.css';
import { useState } from 'react';
import '../src/index.css';
import { Toolbar } from './toolbar';

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
			const [primaryColor, setPrimaryColor] = useState<MantineColor>('blue');

			return (
				<QueryClientProvider client={queryClient}>
					<MantineProvider
						theme={{
							primaryColor,
							cursorType: 'pointer',
						}}
						defaultColorScheme='auto'
					>
						<Toolbar onPrimaryColorChange={setPrimaryColor} />
						{render()}
					</MantineProvider>
				</QueryClientProvider>
			);
		},
	],
};

export default preview;
