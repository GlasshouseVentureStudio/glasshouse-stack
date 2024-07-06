import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type ButtonStory = StoryObj<typeof meta>;

export const Default: ButtonStory = {
	args: {
		children: 'I am a primary button.',
	},
};
