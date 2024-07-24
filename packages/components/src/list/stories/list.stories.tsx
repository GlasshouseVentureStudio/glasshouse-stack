/* eslint-disable react-hooks/rules-of-hooks -- valid for stories */
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Box, Checkbox, Group, Paper, Radio, Stack, Switch, Text, Title } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import chunk from 'lodash.chunk';
import groupBy from 'lodash.groupby';

import { List } from '../list';
import { type PaginationConfig } from '../list.types';

const meta: Meta<typeof List<DataType>> = {
	title: 'Components/Lists/List',
	component: List,
	tags: ['autodocs', 'lists'],
	decorators: [
		render => (
			<Paper
				className='p-5'
				radius={0}
			>
				{render()}
			</Paper>
		),
	],
};

export default meta;

const data = Array.from({ length: 1000 })
	.map(() => ({
		id: faker.string.uuid(),
		name: faker.person.firstName(),
		job: faker.person.jobTitle(),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

type DataType = (typeof data)[number];
type ListStory = StoryObj<typeof meta>;

/**
 * Renders a list with the provided data.
 */
export const Default: ListStory = {
	args: {
		data: data.slice(0, 20),
		itemKey: 'id',
		estimateItemSize: () => 52,
		renderItem: item => (
			<Box className='px-3 py-1'>
				<Title
					className='line-clamp-1 font-semibold'
					order={5}
				>
					{item.name}
				</Title>
				<Text className='line-clamp-1 text-sm text-gray-700'>{item.job}</Text>
			</Box>
		),
	},
};

/**
 * Renders a list with no border.
 */
export const NoBorder: ListStory = {
	args: {
		...Default.args,
		bordered: false,
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
			item: 'data-[active=true]:bg-gray-200',
		},
	},
};

export const OnItemClick: ListStory = {
	args: {
		...Default.args,
		classNames: {
			item: 'cursor-pointer hover:bg-gray-100 transition-all',
		},
		onItemClick: (event, item) => {
			// eslint-disable-next-line no-alert -- This is a demo
			alert(`Clicked on item: ${item.name}`);
		},
	},
};

/**
 * `List` is built with [ScrollArea](https://mantine.dev/core/scroll-area/).
 */
export const ScrollArea: ListStory = {
	args: {
		...Default.args,
		classNames: {
			root: 'h-60',
		},
	},
};

export const Horizontal: ListStory = {
	args: {
		...Default.args,
		orientation: 'horizontal',
		classNames: {
			list: 'h-20',
		},
		estimateItemSize: () => 240,
		renderItem: item => (
			<Box className='flex h-full w-60 flex-col justify-center px-3 py-1'>
				<Title
					className='line-clamp-1 font-semibold'
					order={5}
				>
					{item.name}
				</Title>
				<Text className='line-clamp-1 text-sm text-gray-700'>{item.job}</Text>
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
				className='sticky top-0 px-3 py-1 font-bold uppercase'
			>
				Header
			</Box>
		),
		footer: (
			<Box
				bg='blue'
				c='white'
				className='px-3 py-1 font-bold uppercase'
			>
				Footer
			</Box>
		),
		className: 'h-80',
		stickyHeader: true,
		stickyFooter: false,
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
			<Box className='flex h-full w-full items-center justify-center bg-white bg-opacity-80 py-3 text-center'>
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
			<Box className='flex h-full w-full items-center justify-center bg-opacity-80 py-3 text-center'>No items</Box>
		),
	},
};

/**
 * List is virtualized by default using [`@tanstack/react-virtual`](https://tanstack.com/virtual/latest/docs/framework/react/react-virtual).
 */
export const Virtualized: ListStory = {
	args: {
		...Default.args,
		data,
		className: 'h-96',
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
			<Box
				bg='blue'
				className='px-3 font-bold uppercase'
			>
				{header.title} {`(${header.items.length} items)`}
			</Box>
		),
		className: 'h-96',
		stickyGroupHeader: false,
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
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		job: faker.person.jobTitle(),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

export const Selectable: ListStory = {
	args: {
		...Default.args,
		data: selectableData,
		renderItem: (item, index, active) => (
			<Group
				className='cursor-pointer'
				data-active={active}
				px={8}
			>
				<Checkbox
					checked={active}
					data-testid={item.name}
					id={item.id}
				/>
				<Box className='line-clamp-1 flex h-8 items-center'>
					<label htmlFor={item.id}>{item.name}</label>
				</Box>
			</Group>
		),
		estimateItemSize: () => 32,
		classNames: {
			root: 'w-80',
			item: 'data-[active=true]:bg-gray-200',
		},
		selectable: true,
		onClick: fn(() => {
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
				onChange={value => {
					setValue(value);
				}}
				value={value}
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
			pageSize: 10,
			position: 'bottom',
		},
		classNames: {
			root: 'h-96',
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
					onChange={value => {
						setPosition(value as 'top' | 'bottom');
					}}
					value={position}
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
