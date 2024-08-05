/* eslint-disable react-hooks/rules-of-hooks -- safe */
import { useState } from 'react';
import { Select, Stack } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';

import { Grid } from '../grid';

const meta: Meta<typeof Grid> = {
	title: 'Components/Grid',
	component: Grid,
	tags: ['autodocs'],
};

export default meta;
type GridStory = StoryObj<typeof meta>;

export const Default: GridStory = {
	args: {
		className: 'gvs-flex gvs-items-center gvs-justify-center gvs-p-5',
	},
	render: ({ className }) => (
		<Grid
			columns={3}
			rows={2}
		>
			<Grid.Cell className={className}>1</Grid.Cell>
			<Grid.Cell className={className}>2</Grid.Cell>
			<Grid.Cell className={className}>3</Grid.Cell>
			<Grid.Cell className={className}>4</Grid.Cell>
			<Grid.Cell className={className}>5</Grid.Cell>
			<Grid.Cell className={className}>6</Grid.Cell>
		</Grid>
	),
};

/**
 * Grid can be responsive.
 */
export const ResponsiveGrid: GridStory = {
	args: {
		className: 'gvs-flex gvs-items-center gvs-justify-center gvs-p-5',
	},
	render: ({ className }) => (
		<Grid
			columns={{ base: 1, sm: 2, md: 3 }}
			rows={{ base: 6, sm: 3, md: 2 }}
		>
			<Grid.Cell className={className}>1</Grid.Cell>
			<Grid.Cell className={className}>2</Grid.Cell>
			<Grid.Cell className={className}>3</Grid.Cell>
			<Grid.Cell className={className}>4</Grid.Cell>
			<Grid.Cell className={className}>5</Grid.Cell>
			<Grid.Cell className={className}>6</Grid.Cell>
		</Grid>
	),
};

/**
 * Grid guides can be clipped to specific cells based on cells position.
 */
export const ResponsiveGridWithResponsiveGuideClippingCells: GridStory = {
	args: {
		className: 'gvs-flex gvs-items-center gvs-justify-center gvs-p-5',
	},
	render: ({ className }) => (
		<Grid
			columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
			rows={{ base: 6, sm: 6, md: 3, lg: 2 }}
		>
			<Grid.Cell
				className={className}
				column={{ base: '1', sm: '1', md: '1/3' }}
				row={{ base: '1/3', sm: '1/3', md: 1 }}
			>
				1 + 2
			</Grid.Cell>
			<Grid.Cell className={className}>3</Grid.Cell>
			<Grid.Cell className={className}>4</Grid.Cell>
			<Grid.Cell
				className={className}
				column={{ base: 1, sm: 1, md: '1/3', lg: '2/4' }}
				row={{ base: '5/7', sm: '5/7', md: 3, lg: 2 }}
			>
				5 + 6
			</Grid.Cell>
		</Grid>
	),
};

/**
 * Grid guides can be hidden by either `rows` or `columns` or `all`.
 *
 */
export const HideGuides: GridStory = {
	args: {
		className: 'gvs-flex gvs-items-center gvs-justify-center gvs-p-5',
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
				<Grid
					columns={3}
					hideGuides={hideType}
					rows={2}
				>
					<Grid.Cell className={className}>1</Grid.Cell>
					<Grid.Cell className={className}>2</Grid.Cell>
					<Grid.Cell className={className}>3</Grid.Cell>
					<Grid.Cell className={className}>4</Grid.Cell>
					<Grid.Cell className={className}>5</Grid.Cell>
					<Grid.Cell className={className}>6</Grid.Cell>
				</Grid>
			</Stack>
		);
	},
};

/**
 * Unstable: not finished development.
 */
export const WithGridSystem: GridStory = {
	args: {
		className: 'gvs-flex gvs-items-center gvs-justify-center gvs-p-5',
	},
	render: ({ className }) => (
		<Grid.System unstable_useContainer>
			<Grid
				columns={3}
				rows={2}
			>
				<Grid.Cell className={className}>1</Grid.Cell>
				<Grid.Cell className={className}>2</Grid.Cell>
				<Grid.Cell className={className}>3</Grid.Cell>
				<Grid.Cell className={className}>4</Grid.Cell>
				<Grid.Cell className={className}>5</Grid.Cell>
				<Grid.Cell className={className}>6</Grid.Cell>
			</Grid>
		</Grid.System>
	),
};
