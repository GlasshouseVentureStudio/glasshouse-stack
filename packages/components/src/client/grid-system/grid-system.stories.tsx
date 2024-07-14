import { type Meta, type StoryObj } from '@storybook/react';

import { GridSystem, GridSystemCell } from './grid-system';

const meta: Meta<typeof GridSystem> = {
	title: 'Components/GridSystem',
	component: GridSystem,
	tags: ['autodocs'],
};

export default meta;
type GridSystemStory = StoryObj<typeof meta>;

export const Default: GridSystemStory = {
	args: {
		columns: 3,
		rows: 2,
	},
	render: args => (
		<GridSystem {...args}>
			<GridSystemCell>1</GridSystemCell>
			<GridSystemCell>2</GridSystemCell>
			<GridSystemCell>3</GridSystemCell>
			<GridSystemCell>4</GridSystemCell>
			<GridSystemCell>5</GridSystemCell>
			<GridSystemCell>6</GridSystemCell>
		</GridSystem>
	),
};
