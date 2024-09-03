/* eslint-disable react-hooks/rules-of-hooks -- safe */
import { useState } from 'react';
import {
	ColorSwatch,
	Group,
	type MantineColor,
	MantineProvider,
	type MantineRadius,
	type MantineSize,
	Select,
	Slider,
	Stack,
	Text,
} from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import { CheckIcon } from 'lucide-react';

import { Grid } from '../grid';
import { type GridProps } from '../grid.types';

const meta: Meta<GridProps> = {
	title: 'Components/Grid',
	component: Grid,
	tags: ['autodocs'],
	decorators: [
		Child => (
			<MantineProvider
				theme={{
					components: {
						Select: {
							defaultProps: {
								w: 200,
								checkIconPosition: 'right',
							},
						},
					},
				}}
			>
				{Child()}
			</MantineProvider>
		),
	],
};

export default meta;
type GridStory = StoryObj<typeof meta>;

const MARKS = [
	{ value: 0, label: 'xs' },
	{ value: 25, label: 'sm' },
	{ value: 50, label: 'md' },
	{ value: 75, label: 'lg' },
	{ value: 100, label: 'xl' },
];

export const Default: GridStory = {
	render: args => (
		<Grid
			{...args}
			columns={3}
			rows={2}
		>
			<Grid.Cell>1</Grid.Cell>
			<Grid.Cell>2</Grid.Cell>
			<Grid.Cell>3</Grid.Cell>
			<Grid.Cell>4</Grid.Cell>
			<Grid.Cell>5</Grid.Cell>
			<Grid.Cell>6</Grid.Cell>
		</Grid>
	),
};

/**
 * Grid can be responsive.
 */
export const ResponsiveGrid: GridStory = {
	render: args => (
		<Grid
			{...args}
			columns={{ base: 1, sm: 2, md: 3 }}
			rows={{ base: 6, sm: 3, md: 2 }}
		>
			<Grid.Cell>1</Grid.Cell>
			<Grid.Cell>2</Grid.Cell>
			<Grid.Cell>3</Grid.Cell>
			<Grid.Cell>4</Grid.Cell>
			<Grid.Cell>5</Grid.Cell>
			<Grid.Cell>6</Grid.Cell>
		</Grid>
	),
};

/**
 * Grid guides can be clipped to specific cells based on cells position.
 */
export const ResponsiveGridWithResponsiveGuideClippingCells: GridStory = {
	render: args => (
		<Grid
			{...args}
			columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
			rows={{ base: 6, sm: 6, md: 3, lg: 2 }}
		>
			<Grid.Cell
				column={{ base: '1', sm: '1', md: '1/3' }}
				row={{ base: '1/3', sm: '1/3', md: 1 }}
			>
				1 + 2
			</Grid.Cell>
			<Grid.Cell>3</Grid.Cell>
			<Grid.Cell>4</Grid.Cell>
			<Grid.Cell
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
	render: args => {
		const [hideGuidesType, setHideGuidesType] = useState<'row' | 'column' | 'all'>();

		const hideType = hideGuidesType === 'all' ? true : hideGuidesType;

		return (
			<Stack>
				<Select
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
				/>
				<Grid
					{...args}
					columns={3}
					hideGuides={hideType}
					rows={2}
				>
					<Grid.Cell>1</Grid.Cell>
					<Grid.Cell>2</Grid.Cell>
					<Grid.Cell>3</Grid.Cell>
					<Grid.Cell>4</Grid.Cell>
					<Grid.Cell>5</Grid.Cell>
					<Grid.Cell>6</Grid.Cell>
				</Grid>
			</Stack>
		);
	},
};

/**
 * Grid guides can be colored using `guideColor` prop.
 */
export const GuideColor: GridStory = {
	render: args => {
		const [color, setColor] = useState<MantineColor>('blue');

		const colors: MantineColor[] = [
			'dark',
			'gray',
			'red',
			'pink',
			'grape',
			'violet',
			'indigo',
			'blue',
			'cyan',
			'green',
			'lime',
			'yellow',
			'orange',
			'teal',
		];

		return (
			<Stack>
				<Select
					data={colors}
					onChange={value => {
						setColor(value as MantineColor);
					}}
					renderOption={({ option, checked }) => (
						<Group
							justify='space-between'
							w='100%'
						>
							<Group gap={8}>
								<ColorSwatch
									color={`var(--mantine-color-${option.value}-6)`}
									radius={2}
									size={20}
								/>
								<Text className='gvs-text-sm'>{option.label}</Text>
							</Group>
							{checked ? (
								<Text c={color}>
									<CheckIcon size={14} />
								</Text>
							) : null}
						</Group>
					)}
					value={color}
				/>
				<Grid
					{...args}
					columns={3}
					guideColor={color}
					rows={2}
				>
					<Grid.Cell>1</Grid.Cell>
					<Grid.Cell>2</Grid.Cell>
					<Grid.Cell>3</Grid.Cell>
					<Grid.Cell>4</Grid.Cell>
					<Grid.Cell>5</Grid.Cell>
					<Grid.Cell>6</Grid.Cell>
				</Grid>
			</Stack>
		);
	},
};

/**
 * Grid root element can have border radius using `radius` prop.
 */
export const Radius: GridStory = {
	render: args => {
		const [radius, setRadius] = useState<MantineRadius | undefined>('md');

		const _value = MARKS.find(mark => mark.label === radius)?.value;

		const handleChange = (val: number) => {
			setRadius(MARKS.find(mark => mark.value === val)?.label);
		};

		return (
			<Stack>
				<Slider
					label={val => MARKS.find(mark => mark.value === val)?.label}
					marks={MARKS}
					onChange={handleChange}
					step={25}
					styles={{
						markLabel: { display: 'none' },
					}}
					thumbLabel='Radius'
					value={_value}
					w={200}
				/>
				<Grid
					{...args}
					columns={3}
					radius={radius}
					rows={2}
				>
					<Grid.Cell>1</Grid.Cell>
					<Grid.Cell>2</Grid.Cell>
					<Grid.Cell>3</Grid.Cell>
					<Grid.Cell>4</Grid.Cell>
					<Grid.Cell>5</Grid.Cell>
					<Grid.Cell>6</Grid.Cell>
				</Grid>
			</Stack>
		);
	},
};

export const CellPadding: GridStory = {
	render: args => {
		const [padding, setPadding] = useState<MantineSize | undefined>('md');

		const _value = MARKS.find(mark => mark.label === padding)?.value;

		const handleChange = (val: number) => {
			setPadding(MARKS.find(mark => mark.value === val)?.label as MantineSize);
		};

		return (
			<Stack>
				<Slider
					label={val => MARKS.find(mark => mark.value === val)?.label}
					marks={MARKS}
					onChange={handleChange}
					step={25}
					styles={{
						markLabel: { display: 'none' },
					}}
					thumbLabel='Radius'
					value={_value}
					w={200}
				/>
				<Grid
					{...args}
					cellPadding={padding}
					columns={3}
					rows={2}
				>
					<Grid.Cell>1</Grid.Cell>
					<Grid.Cell>2</Grid.Cell>
					<Grid.Cell>3</Grid.Cell>
					<Grid.Cell>4</Grid.Cell>
					<Grid.Cell>5</Grid.Cell>
					<Grid.Cell>6</Grid.Cell>
				</Grid>
			</Stack>
		);
	},
};

/**
 * `Grid` is a polymorphic component - its default root element is `section`, but it can be changed to any other element or component with `component` prop.
 *
 * `Grid.Cell` is also a polymorphic component - its default root element is `div`, but it can be changed to any other element or component with `component` prop.
 */
export const PolymorphicComponent: GridStory = {
	render: args => (
		<Grid
			{...args}
			columns={3}
			component='div'
			rows={2}
		>
			<Grid.Cell>Div (default)</Grid.Cell>
			<Grid.Cell component='p'>Paragraph</Grid.Cell>
			<Grid.Cell component='a'>Anchor</Grid.Cell>
			<Grid.Cell component='section'>Section</Grid.Cell>
			<Grid.Cell component='figure'>Figure</Grid.Cell>
			<Grid.Cell component='article'>Article</Grid.Cell>
		</Grid>
	),
};
