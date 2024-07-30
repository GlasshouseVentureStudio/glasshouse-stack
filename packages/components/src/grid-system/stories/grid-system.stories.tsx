/* eslint-disable react-hooks/rules-of-hooks -- safe */
import { useState } from 'react';
import { Select, Stack } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';

import { GridSystem } from '../grid-system';

const meta: Meta<typeof GridSystem> = {
	title: 'Components/GridSystem',
	component: GridSystem,
	tags: ['autodocs'],
};

export default meta;
type GridSystemStory = StoryObj<typeof meta>;

export const Default: GridSystemStory = {
	args: {
		className: 'flex items-center justify-center p-5',
	},
	render: ({ className }) => (
		<GridSystem
			columns={3}
			rows={2}
		>
			<GridSystem.Cell className={className}>1</GridSystem.Cell>
			<GridSystem.Cell className={className}>2</GridSystem.Cell>
			<GridSystem.Cell className={className}>3</GridSystem.Cell>
			<GridSystem.Cell className={className}>4</GridSystem.Cell>
			<GridSystem.Cell className={className}>5</GridSystem.Cell>
			<GridSystem.Cell className={className}>6</GridSystem.Cell>
		</GridSystem>
	),
};

export const ResponsiveGrid: GridSystemStory = {
	args: {
		className: 'flex items-center justify-center p-5',
	},
	render: ({ className }) => (
		<GridSystem
			columns={{ base: 1, sm: 2, md: 3 }}
			rows={{ base: 6, sm: 3, md: 2 }}
		>
			<GridSystem.Cell className={className}>1</GridSystem.Cell>
			<GridSystem.Cell className={className}>2</GridSystem.Cell>
			<GridSystem.Cell className={className}>3</GridSystem.Cell>
			<GridSystem.Cell className={className}>4</GridSystem.Cell>
			<GridSystem.Cell className={className}>5</GridSystem.Cell>
			<GridSystem.Cell className={className}>6</GridSystem.Cell>
		</GridSystem>
	),
};

export const ResponsiveGridWithResponsiveGuideClippingCells: GridSystemStory = {
	args: {
		className: 'flex items-center justify-center p-5',
	},
	render: ({ className }) => (
		<GridSystem
			columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
			rows={{ base: 6, sm: 6, md: 3, lg: 2 }}
		>
			<GridSystem.Cell
				className={className}
				column={{ base: '1', sm: '1', md: '1/3' }}
				row={{ base: '1/3', sm: '1/3', md: 1 }}
			>
				1 + 2
			</GridSystem.Cell>
			<GridSystem.Cell className={className}>3</GridSystem.Cell>
			<GridSystem.Cell className={className}>4</GridSystem.Cell>
			<GridSystem.Cell
				className={className}
				column={{ base: 1, sm: 1, md: '1/3', lg: '2/4' }}
				row={{ base: '5/7', sm: '5/7', md: 3, lg: 2 }}
			>
				5 + 6
			</GridSystem.Cell>
		</GridSystem>
	),
};

export const HideGuides: GridSystemStory = {
	args: {
		className: 'flex items-center justify-center p-5',
	},
	render: ({ className }) => {
		const [hideGuidesType, setHideGuidesType] = useState<'row' | 'column' | 'all'>();

		const hideType = hideGuidesType === 'all' ? true : hideGuidesType;

		return (
			<Stack>
				<Select
					checkIconPosition='right'
					data={[
						{ value: 'row', label: 'Row' },
						{ value: 'column', label: 'Column' },
						{ value: 'all', label: 'All' },
					]}
					onChange={value => {
						setHideGuidesType(value as 'row' | 'column' | 'all');
					}}
					placeholder='Hide type'
					value={hideGuidesType as string}
					w={200}
				/>
				<GridSystem
					columns={3}
					hideGuides={hideType}
					rows={2}
				>
					<GridSystem.Cell className={className}>1</GridSystem.Cell>
					<GridSystem.Cell className={className}>2</GridSystem.Cell>
					<GridSystem.Cell className={className}>3</GridSystem.Cell>
					<GridSystem.Cell className={className}>4</GridSystem.Cell>
					<GridSystem.Cell className={className}>5</GridSystem.Cell>
					<GridSystem.Cell className={className}>6</GridSystem.Cell>
				</GridSystem>
			</Stack>
		);
	},
};
