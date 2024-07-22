/* eslint-disable no-console -- safe for stories */
import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';

import { Button } from './button';

const meta: Meta<typeof Button> = {
	title: 'Examples/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'inline-radio',
			options: ['xs', 'sm', 'md', 'lg', 'xl', 'compact-xs', 'compact-sm', 'compact-md', 'compact-lg', 'compact-xl'],
		},
	},
};

export default meta;
type ButtonStory = StoryObj<typeof meta>;

export const Default: ButtonStory = {
	args: {
		children: 'I am a Mantine button.',
		size: 'sm',
		onClick: fn(() => {
			console.log('Button clicked');
		}),
	},
	render: args => (
		<Button
			{...args}
			data-testid='button-stories'
		/>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByTestId('button-stories'));
	},
};
