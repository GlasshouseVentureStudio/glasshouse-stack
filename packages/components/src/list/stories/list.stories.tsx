/* eslint-disable react-hooks/rules-of-hooks -- valid for stories */
import { useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Avatar, Box, Button, Checkbox, Group, Paper, Radio, rem, Stack, Switch, Text, Title } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { type Virtualizer } from '@tanstack/react-virtual';
import chunk from 'lodash.chunk';
import groupBy from 'lodash.groupby';

import { List } from '../list';
import { type PaginationConfig } from '../list.types';

faker.seed(187);

const data = Array.from({ length: 1000 }).map(() => ({
	id: faker.string.ulid(),
	name: faker.person.fullName(),
	avatar: faker.datatype.boolean() ? faker.image.avatar() : undefined,
	job: `${faker.person.jobDescriptor()} ${faker.person.jobTitle()}`,
	company: {
		name: faker.company.name(),
		catchPhrase: faker.company.catchPhrase(),
	},
	location: {
		city: faker.location.city(),
		state: faker.location.state(),
		country: faker.location.country(),
	},
	bio: faker.word.words({ count: { min: 10, max: 50 } }),
}));

const meta: Meta<typeof List<DataType>> = {
	title: 'Components/Lists/List',
	component: List,
	tags: ['autodocs', 'lists'],
	decorators: [
		render => (
			<Paper
				h='100%'
				p={rem(20)}
				radius={0}
			>
				{render()}
			</Paper>
		),
	],
	args: {
		virtualized: true,
		radius: 'md',
		orientation: 'vertical',
	},
	argTypes: {
		data: { control: false },
	},
};

export default meta;

type DataType = (typeof data)[number];
type ListStory = StoryObj<typeof meta>;

/** Renders a list with the provided data. */
export const Default: ListStory = {
	args: {
		data: data.slice(0, 10),
		radius: 'md',
		itemKey: 'id',
		w: 420,
		estimateItemSize: () => 52,
		renderItem: item => (
			<Box className='gvs-px-3 gvs-py-1'>
				<Title
					className='gvs-line-clamp-1 gvs-font-semibold'
					order={5}
				>
					{item.name}
				</Title>
				<Text className='gvs-line-clamp-1 gvs-text-sm gvs-text-gray-700'>{item.job}</Text>
			</Box>
		),
	},
	parameters: {
		controls: { exclude: ['data'] },
	},
};

/**
 * Renders a list with no border.
 */
export const NoBorder: ListStory = {
	args: {
		...Default.args,
		withBorder: false,
		withItemBorder: false,
	},
};

/**
 * Get active item by `getActiveItem` function.
 */
export const ActiveItem: ListStory = {
	args: {
		...Default.args,
		getActiveItem: (item, index) => index === 2,
		classNames: {
			item: 'gvs-data-[active=true]:gvs-bg-gray-200',
		},
	},
};

export const OnItemClick: ListStory = {
	args: {
		...Default.args,
		classNames: {
			item: 'gvs-cursor-pointer gvs-hover:bg-gray-100 gvs-transition-all',
		},
		onItemClick: (event, item) => {
			// eslint-disable-next-line no-alert -- This is a demo
			alert(`Clicked on item: ${item.name}`);
		},
	},
};

/**
 * `List` is built with `ScrollShadow` component, which can be customized using `scrollShadowProps` prop.
 */
export const ScrollShadow: ListStory = {
	args: {
		...Default.args,
		classNames: {
			root: 'gvs-h-60',
		},
		data,
		scrollShadowProps: {
			shadowSize: 'xl',
			scrollbarSize: rem(6),
			offsetScrollbars: 'y',
			type: 'always',
			shadowVisibility: 'bottom',
		},
	},
};

export const Horizontal: ListStory = {
	args: {
		...Default.args,
		orientation: 'horizontal',
		estimateItemSize: () => 240,
		classNames: {
			list: '!gvs-h-20',
		},
		renderItem: item => (
			<Box className='gvs-flex gvs-w-60 gvs-h-full gvs-flex-col gvs-justify-center gvs-px-3 gvs-py-1'>
				<Title
					className='gvs-line-clamp-1 gvs-font-semibold'
					order={5}
				>
					{item.name}
				</Title>
				<Text className='gvs-line-clamp-1 gvs-text-sm gvs-text-gray-700'>{item.job}</Text>
			</Box>
		),
	},
};

export const HeaderFooter: ListStory = {
	args: {
		...Default.args,
		header: (
			<Box
				bg='blue'
				c='white'
				className='gvs-sticky gvs-top-0 gvs-px-3 gvs-py-1 gvs-font-bold gvs-uppercase'
			>
				Header
			</Box>
		),
		footer: (
			<Box
				bg='blue'
				c='white'
				className='gvs-px-3 gvs-py-1 gvs-font-bold gvs-uppercase'
			>
				Footer
			</Box>
		),
		className: 'gvs-h-80',
		stickyHeader: true,
		stickyFooter: false,
		scrollShadowProps: {
			shadowEnabled: false,
		},
	},
	render: args => {
		const [stickyHeader, setStickyHeader] = useState(args.stickyHeader);
		const [stickyFooter, setStickyFooter] = useState(args.stickyFooter);

		return (
			<Stack>
				<List
					{...args}
					stickyFooter={stickyFooter}
					stickyHeader={stickyHeader}
				/>
				<Group>
					<Switch
						checked={stickyHeader}
						label='Sticky header'
						onChange={event => {
							setStickyHeader(event.currentTarget.checked);
						}}
					/>
					<Switch
						checked={stickyFooter}
						label='Sticky footer'
						onChange={event => {
							setStickyFooter(event.currentTarget.checked);
						}}
					/>
				</Group>
			</Stack>
		);
	},
};

/**
 * Renders a list with loading state using `loading` prop.
 */
export const Loading: ListStory = {
	args: {
		...Default.args,
		data: data.slice(0, 5),
		loading: true,
	},
	render: args => {
		const [loading, setLoading] = useState(args.loading);

		return (
			<Stack>
				<List
					{...args}
					loading={loading}
				/>
				<Switch
					checked={loading}
					label='Loading'
					onChange={event => {
						setLoading(event.currentTarget.checked);
					}}
				/>
			</Stack>
		);
	},
};

export const CustomLoader: ListStory = {
	args: {
		...Loading.args,
		data: data.slice(0, 5),
		loading: true,
		renderLoader: () => (
			<Box className='gvs-flex gvs-h-full gvs-w-full gvs-items-center gvs-justify-center gvs-bg-white gvs-bg-opacity-80 gvs-py-3 gvs-text-center'>
				Loading...
			</Box>
		),
	},
};

export const Empty: ListStory = {
	args: {
		...Default.args,
		data: [],
		renderEmpty: () => (
			<Box className='gvs-flex gvs-h-full gvs-w-full gvs-items-center gvs-justify-center gvs-bg-opacity-80 gvs-py-3 gvs-text-center'>
				No items
			</Box>
		),
	},
};

/** List is virtualized by default using [`@tanstack/react-virtual`](https://tanstack.com/virtual/latest/docs/framework/react/react-virtual). Virtualization can be disabled using `virtualized` props. */
export const Virtualized: ListStory = {
	args: {
		...Default.args,
		data,
		virtualized: true,
		className: 'gvs-h-96',
	},
	render: ({ virtualized, ...args }) => {
		const data = virtualized ? args.data : args.data.slice(0, 100);

		return (
			<List
				{...args}
				data={data}
				virtualized={virtualized}
			/>
		);
	},
};

/**
 * Group data using `groupByFn` and `renderGroupHeader` must be provided, group header can by sticky.
 */
export const Grouped: ListStory = {
	args: {
		...Default.args,
		data,
		groupByFn: items => groupBy(items, item => item.name.toLowerCase()[0]),

		renderGroupHeader: header => (
			<Box className='gvs-px-3 gvs-font-bold gvs-uppercase gvs-py-2 gvs-bg-white'>
				{header.title} {`(${header.items.length} items)`}
			</Box>
		),

		className: 'gvs-h-96',
		stickyGroupHeader: false,
		estimateGroupHeaderSize: () => 41,

		scrollShadowProps: {
			shadowVisibility: 'bottom',
		},

		virtualized: false,
	},
	render: args => {
		const [sticky, setSticky] = useState(args.stickyGroupHeader);

		return (
			<Stack>
				<List
					{...args}
					stickyGroupHeader={sticky}
				/>
				<Switch
					checked={sticky}
					label='Sticky group header'
					onChange={event => {
						setSticky(event.currentTarget.checked);
					}}
				/>
			</Stack>
		);
	},
};

const selectableData: DataType[] = Array.from({ length: 5 })
	.map(() => ({
		id: faker.string.ulid(),
		name: faker.person.fullName(),
		avatar: faker.datatype.boolean() ? faker.image.avatar() : undefined,
		job: `${faker.person.jobDescriptor()} ${faker.person.jobTitle()}`,
		company: {
			name: faker.company.name(),
			catchPhrase: faker.company.catchPhrase(),
		},
		location: {
			city: faker.location.city(),
			state: faker.location.state(),
			country: faker.location.country(),
		},
		bio: faker.word.words({ count: { min: 10, max: 50 } }),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

export const Selectable: ListStory = {
	args: {
		...Default.args,
		data: selectableData,
		renderItem: (item, index, active) => (
			<Group
				className='gvs-cursor-pointer'
				data-active={active}
				px={8}
			>
				<Checkbox
					checked={active}
					data-testid={item.name}
					id={item.id}
					readOnly
				/>
				<Box className='gvs-line-clamp-1 gvs-flex gvs-h-8 gvs-items-center'>
					<label htmlFor={item.id}>{item.name}</label>
				</Box>
			</Group>
		),
		estimateItemSize: () => 32,
		classNames: {
			root: 'gvs-w-80',
			item: 'gvs-data-[active=true]:gvs-bg-gray-200',
		},
		selectable: true,
		onClick: fn(() => {
			// eslint-disable-next-line no-console -- This is a demo
			console.log('Item clicked');
		}),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const elements = selectableData.map(item => canvas.getByTestId(item.name));

		for (const element of elements) {
			await userEvent.click(element);
			await expect(element).toBeChecked();
		}
	},
};

/**
 * Controlled SelectList using `value` and `onChange` props.
 */
export const ControlledSelectable: ListStory = {
	args: {
		...Selectable.args,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const element = canvas.getByTestId(selectableData[3]?.name ?? '');

		await userEvent.click(element);
		await expect(element).toBeChecked();
	},
	render: args => {
		const [value, setValue] = useState<(typeof data)[number] | undefined>(selectableData[0]);

		return (
			<List
				{...args}
				value={value}
				onChange={value => {
					setValue(value);
				}}
			/>
		);
	},
};

export const Pagination: ListStory = {
	args: {
		...Default.args,
		data,
		pagination: {
			total: chunk(data, 20).length,
			position: 'bottom',
		},
		classNames: {
			root: 'gvs-h-96',
		},
		scrollShadowProps: {
			shadowEnabled: false,
		},
	},
	render: args => {
		const [position, setPosition] = useState<PaginationConfig['position']>('bottom');
		const [page, setPage] = useState(1);

		const data = chunk(args.data, 20);

		const items = data[page - 1] ?? [];

		return (
			<Stack>
				<List
					{...args}
					data={items}
					pagination={{
						...args.pagination,
						value: page,
						total: args.pagination?.total ?? 0,
						onChange: value => {
							setPage(value);
						},
						position,
					}}
				/>
				<Radio.Group
					label='Pagination position'
					value={position}
					onChange={value => {
						setPosition(value as 'top' | 'bottom');
					}}
				>
					<Group>
						<Radio
							label='Top'
							value='top'
						/>
						<Radio
							label='Bottom'
							value='bottom'
						/>
					</Group>
				</Radio.Group>
			</Stack>
		);
	},
};

export const Rounded: ListStory = {
	...Default,
	args: {
		...Default.args,
		radius: 'lg',
	},
};

/**
 * Virtualized list with **dynamic** item sizes, enabled by setting `measureElements` prop to `true`. This means that each element's exact dimensions are unknown when rendered. An estimated dimension is used to get an a initial measurement, then this measurement is readjusted on the fly as each element is rendered.
 *
 * ***Sticky group header won't work with dynamic item sizes.***
 */
export const MeasureVirtualizedItems: ListStory = {
	...Virtualized,
	args: {
		...Virtualized.args,
		data,
		virtualized: true,
		measureElements: true,
		w: 420,
		h: 420,
		estimateItemSize: () => 200,
		stickyGroupHeader: false,
		renderItem: item => (
			<Stack
				px={16}
				py={10}
			>
				<Group
					align='flex-start'
					wrap='nowrap'
				>
					<Avatar
						color='initials'
						mt={6}
						name={item.name}
						src={item.avatar}
					/>
					<Stack
						className='gvs-flex-1'
						gap={0}
					>
						<Text
							fw={700}
							size='lg'
						>
							{item.name}
						</Text>
						<Text
							c='dimmed'
							size='xs'
						>
							<Text
								fw={600}
								span
							>
								{item.job}
							</Text>{' '}
							at{' '}
							<Text
								fw={600}
								span
							>
								{item.company.name}
							</Text>
						</Text>
						<Text
							className='gvs-text-right'
							component='em'
							mt='xs'
							size='xs'
						>
							- {item.company.catchPhrase}
						</Text>
					</Stack>
				</Group>
				<Text size='xs'>
					{item.bio} {item.id}
				</Text>
			</Stack>
		),
	},
	render: args => {
		const ref = useRef<Virtualizer<HTMLDivElement, Element>>(null);
		const count = data.length;

		const [grouped, setGrouped] = useState(false);

		return (
			<Stack>
				<Group gap='xs'>
					<Button
						size='xs'
						variant='default'
						onClick={() => {
							ref.current?.scrollToIndex(0);
						}}
					>
						Scroll to the start
					</Button>
					<Button
						size='xs'
						variant='default'
						onClick={() => {
							ref.current?.scrollToIndex(count / 2);
						}}
					>
						Scroll to the middle
					</Button>
					<Button
						size='xs'
						variant='default'
						onClick={() => {
							ref.current?.scrollToIndex(count - 1);
						}}
					>
						Scroll to the end
					</Button>
				</Group>
				<Switch
					checked={grouped}
					label='Grouped'
					onChange={event => {
						setGrouped(event.currentTarget.checked);
					}}
				/>
				<List
					estimateGroupHeaderSize={grouped ? () => 40 : undefined}
					groupByFn={grouped ? items => groupBy(items, item => item.location.country) : undefined}
					virtualizerRef={ref}
					renderGroupHeader={header => (
						<Group
							className='gvs-bg-white'
							h={40}
							px={10}
						>
							<Text fw={600}>{header.title}</Text>
						</Group>
					)}
					{...args}
				/>
			</Stack>
		);
	},
};

/**
 * `onEndReached` will be called once when the scroll position gets within `onEndReachedThreshold` from the logical end of the list.
 */
export const OnEndReached: ListStory = {
	...MeasureVirtualizedItems,
	args: {
		...MeasureVirtualizedItems.args,
		onEndReached: fn(() => {
			// eslint-disable-next-line no-console -- This is a demo
			console.log('On end reached');
		}),
	},
};
