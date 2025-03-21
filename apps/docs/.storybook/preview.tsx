import { useState } from 'react';
import { type MantineColor, MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toolbar } from './toolbar';

import '@mantine/core/styles.css';
import 'mantine-react-table/styles.css';
import '../src/index.css';

const preview: Preview = {
    parameters: {
		docs: {
			toc: true,
		},
		controls: {
			matchers: {
				color: /(?:background|color)$/i,
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
						defaultColorScheme='auto'
						theme={{
							primaryColor,
							cursorType: 'pointer',
							black: 'var(--gray-12)',
							colors: {
								gray: [
									'var(--sage-3)',
									'var(--sage-4)',
									'var(--sage-5)',
									'var(--sage-6)',
									'var(--sage-7)',
									'var(--sage-8)',
									'var(--sage-9)',
									'var(--sage-10)',
									'var(--sage-11)',
									'var(--sage-12)',
								],
								red: [
									'var(--red-3)',
									'var(--red-4)',
									'var(--red-5)',
									'var(--red-6)',
									'var(--red-7)',
									'var(--red-8)',
									'var(--red-9)',
									'var(--red-10)',
									'var(--red-11)',
									'var(--red-12)',
								],
								pink: [
									'var(--pink-3)',
									'var(--pink-4)',
									'var(--pink-5)',
									'var(--pink-6)',
									'var(--pink-7)',
									'var(--pink-8)',
									'var(--pink-9)',
									'var(--pink-10)',
									'var(--pink-11)',
									'var(--pink-12)',
								],
								blue: [
									'var(--blue-3)',
									'var(--blue-4)',
									'var(--blue-5)',
									'var(--blue-6)',
									'var(--blue-7)',
									'var(--blue-8)',
									'var(--blue-9)',
									'var(--blue-10)',
									'var(--blue-11)',
									'var(--blue-12)',
								],
								cyan: [
									'var(--cyan-3)',
									'var(--cyan-4)',
									'var(--cyan-5)',
									'var(--cyan-6)',
									'var(--cyan-7)',
									'var(--cyan-8)',
									'var(--cyan-9)',
									'var(--cyan-10)',
									'var(--cyan-11)',
									'var(--cyan-12)',
								],
								dark: [
									'var(--gray-3)',
									'var(--gray-4)',
									'var(--gray-5)',
									'var(--gray-6)',
									'var(--gray-7)',
									'var(--gray-8)',
									'var(--gray-9)',
									'var(--gray-10)',
									'var(--gray-11)',
									'var(--gray-12)',
								],
								indigo: [
									'var(--indigo-3)',
									'var(--indigo-4)',
									'var(--indigo-5)',
									'var(--indigo-6)',
									'var(--indigo-7)',
									'var(--indigo-8)',
									'var(--indigo-9)',
									'var(--indigo-10)',
									'var(--indigo-11)',
									'var(--indigo-12)',
								],
								grape: [
									'var(--purple-3)',
									'var(--purple-4)',
									'var(--purple-5)',
									'var(--purple-6)',
									'var(--purple-7)',
									'var(--purple-8)',
									'var(--purple-9)',
									'var(--purple-10)',
									'var(--purple-11)',
									'var(--purple-12)',
								],
								green: [
									'var(--green-3)',
									'var(--green-4)',
									'var(--green-5)',
									'var(--green-6)',
									'var(--green-7)',
									'var(--green-8)',
									'var(--green-9)',
									'var(--green-10)',
									'var(--green-11)',
									'var(--green-12)',
								],
								lime: [
									'var(--lime-3)',
									'var(--lime-4)',
									'var(--lime-5)',
									'var(--lime-6)',
									'var(--lime-7)',
									'var(--lime-8)',
									'var(--lime-9)',
									'var(--lime-10)',
									'var(--lime-11)',
									'var(--lime-12)',
								],
								orange: [
									'var(--orange-3)',
									'var(--orange-4)',
									'var(--orange-5)',
									'var(--orange-6)',
									'var(--orange-7)',
									'var(--orange-8)',
									'var(--orange-9)',
									'var(--orange-10)',
									'var(--orange-11)',
									'var(--orange-12)',
								],
								teal: [
									'var(--teal-3)',
									'var(--teal-4)',
									'var(--teal-5)',
									'var(--teal-6)',
									'var(--teal-7)',
									'var(--teal-8)',
									'var(--teal-9)',
									'var(--teal-10)',
									'var(--teal-11)',
									'var(--teal-12)',
								],
								violet: [
									'var(--violet-3)',
									'var(--violet-4)',
									'var(--violet-5)',
									'var(--violet-6)',
									'var(--violet-7)',
									'var(--violet-8)',
									'var(--violet-9)',
									'var(--violet-10)',
									'var(--violet-11)',
									'var(--violet-12)',
								],
								yellow: [
									'var(--yellow-3)',
									'var(--yellow-4)',
									'var(--yellow-5)',
									'var(--yellow-6)',
									'var(--yellow-7)',
									'var(--yellow-8)',
									'var(--yellow-9)',
									'var(--yellow-10)',
									'var(--yellow-11)',
									'var(--yellow-12)',
								],
							},
						}}
					>
						<Toolbar onPrimaryColorChange={setPrimaryColor} />
						{render()}
					</MantineProvider>
				</QueryClientProvider>
			);
		},
	],

    tags: ['autodocs']
};

export default preview;
