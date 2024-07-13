import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Box, Group, Stack, Switch } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import groupBy from 'lodash.groupby';

import { List } from './list';

const meta: Meta<typeof List<(typeof data)[number]>> = {
	title: 'Components/List',
	component: List,
	tags: ['autodocs'],
};

export default meta;

const data = Array.from({ length: 100 })
	.map(() => ({
		id: faker.string.uuid(),
		name: faker.person.firstName(),
		job: faker.person.jobTitle(),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

type ListStory = StoryObj<typeof meta>;

/**
 * Renders a list with the provided data.
 */
export const Default: ListStory = {
	args: {
		data: data.slice(0, 10),
		itemKey: 'id',
		estimateItemSize: () => 52,
		renderItem: item => (
			<div className='px-3 py-1'>
				<h3 className='line-clamp-1 font-semibold'>{item.name}</h3>
				<p className='line-clamp-1 text-sm text-gray-700'>{item.job}</p>
			</div>
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
		data,
		orientation: 'horizontal',
		classNames: {
			list: 'h-20',
		},
		estimateItemSize: () => 240,
		renderItem: item => (
			<div className='flex h-full w-60 flex-col justify-center px-3 py-1'>
				<h3 className='line-clamp-1 font-semibold'>{item.name}</h3>
				<p className='line-clamp-1 text-sm text-gray-700'>{item.job}</p>
			</div>
		),
	},
};

export const HeaderFooter: ListStory = {
	args: {
		...Default.args,
		header: <Box className='sticky top-0 bg-blue-100 px-3 py-1 font-bold uppercase'>Header</Box>,
		footer: <Box className='bg-blue-100 px-3 py-1 font-bold uppercase'>Footer</Box>,
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

export const Loading: ListStory = {
	args: {
		...Default.args,
		loading: true,
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
		renderGroupHeader: title => <Box className='bg-blue-100 px-3 font-bold uppercase'>{title}</Box>,
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
