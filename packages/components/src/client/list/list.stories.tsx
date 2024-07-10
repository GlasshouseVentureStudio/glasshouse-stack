import { type Meta, type StoryObj } from '@storybook/react';

import { List } from './list';

const meta: Meta<typeof List<(typeof items)[number]>> = {
	title: 'Components/List',
	component: List,
	tags: ['autodocs'],
};

export default meta;

const items = [
	{
		id: 1,
		title: 'Breaking News: Market Hits Record High',
		description:
			'The stock market reached an all-time high today, driven by strong earnings reports from major tech companies.',
		date: '2024-07-01',
		author: 'Jane Doe',
		imageUrl: 'https://example.com/image1.jpg',
	},
	{
		id: 2,
		title: 'Weather Update: Tropical Storm Approaching',
		description:
			'A tropical storm is expected to make landfall tomorrow, bringing heavy rain and strong winds to the coastal areas.',
		date: '2024-07-02',
		author: 'John Smith',
		imageUrl: 'https://example.com/image2.jpg',
	},
	{
		id: 3,
		title: 'Tech Giants Announce New Innovations',
		description:
			'Several major tech companies unveiled their latest products and innovations at the annual tech conference today.',
		date: '2024-07-03',
		author: 'Alice Johnson',
		imageUrl: 'https://example.com/image3.jpg',
	},
	{
		id: 4,
		title: 'Sports: Championship Game Recap',
		description:
			'The championship game ended in a thrilling victory for the home team, with a last-minute goal securing the win.',
		date: '2024-07-04',
		author: 'Bob Brown',
		imageUrl: 'https://example.com/image4.jpg',
	},
	{
		id: 5,
		title: 'Health: Tips for a Balanced Diet',
		description:
			'Experts share their tips for maintaining a balanced diet and staying healthy in the busy modern world.',
		date: '2024-07-05',
		author: 'Cathy White',
		imageUrl: 'https://example.com/image5.jpg',
	},
	{
		id: 6,
		title: 'Economy: Inflation Rates on the Rise',
		description: 'Inflation rates have been steadily increasing, raising concerns about the long-term economic impact.',
		date: '2024-07-06',
		author: 'David Green',
		imageUrl: 'https://example.com/image6.jpg',
	},
	{
		id: 7,
		title: 'Entertainment: New Movie Release',
		description:
			'The highly anticipated new movie hit theaters this weekend, drawing large crowds and positive reviews.',
		date: '2024-07-07',
		author: 'Eve Black',
		imageUrl: 'https://example.com/image7.jpg',
	},
	{
		id: 8,
		title: 'Politics: Election Results Announced',
		description: 'The results of the recent election have been announced, with the incumbent party retaining control.',
		date: '2024-07-08',
		author: 'Frank Blue',
		imageUrl: 'https://example.com/image8.jpg',
	},
	{
		id: 9,
		title: 'Science: New Discovery in Space',
		description:
			'Scientists have announced a groundbreaking discovery in space, shedding new light on the origins of the universe.',
		date: '2024-07-09',
		author: 'Grace Orange',
		imageUrl: 'https://example.com/image9.jpg',
	},
	{
		id: 10,
		title: 'Travel: Top Destinations for 2024',
		description:
			'Travel experts have released their list of the top destinations to visit in 2024, featuring both popular and off-the-beaten-path locations.',
		date: '2024-07-10',
		author: 'Henry Purple',
		imageUrl: 'https://example.com/image10.jpg',
	},
];

const defaultMockData = [
	'Breaking News: Market Hits Record High',
	'Weather Update: Tropical Storm Approaching',
	'Tech Giants Announce New Innovations',
	'Sports: Championship Game Recap',
	'Health: Tips for a Balanced Diet',
	'Economy: Inflation Rates on the Rise',
	'Entertainment: New Movie Release',
	'Politics: Election Results Announced',
	'Science: New Discovery in Space',
	'Travel: Top Destinations for 2024',
];

type DefaultStory = StoryObj<Meta<typeof List<(typeof defaultMockData)[number]>>>;

/**
 * Renders a list with the provided data.
 */
export const Default: DefaultStory = {
	args: {
		data: defaultMockData.slice(0, 3),
	},
};

/**
 * Renders a list with no border.
 */
export const NoBorder: DefaultStory = {
	args: {
		data: defaultMockData,
		bordered: false,
	},
};

type ListStory = StoryObj<typeof meta>;

/**
 * Renders a list item with the provided data and `getItemLabel` function.
 */
export const GetItemLabel: ListStory = {
	args: {
		data: items,
		itemKey: 'id',
		getItemLabel: item => <h3 className='line-clamp-2 font-semibold'>{item.description}</h3>,
	},
};

/**
 * Renders a list item with the provided data and `renderItem` function.
 */
export const RenderItem: ListStory = {
	args: {
		data: items,
		itemKey: 'id',
		renderItem: item => (
			<div className='max-w-80 border-b px-3 py-1 last:border-b-0'>
				<h3 className='line-clamp-2 font-semibold'>{item.title}</h3>
				<p className='line-clamp-2 text-sm text-gray-700'>{item.description}</p>
			</div>
		),
	},
};

/**
 * Get active item by `getActiveItem` function.
 */
export const ActiveItem: DefaultStory = {
	args: {
		data: defaultMockData,
		getActiveItem: (item, index) => index === 2,
		classNames: {
			item: 'data-[active=true]:bg-gray-200',
		},
	},
};

export const OnItemClick: ListStory = {
	args: {
		data: items,
		itemKey: 'id',
		getItemLabel: item => <h3 className='line-clamp-2 cursor-pointer font-semibold'>{item.title}</h3>,
		onItemClick: (event, item) => {
			// eslint-disable-next-line no-alert -- This is a demo
			alert(`Clicked on item: ${item.title}`);
		},
	},
};

/**
 * [ScrollArea](https://mantine.dev/core/scroll-area/) is baked into `List`.
 */
export const ScrollArea: ListStory = {
	args: {
		data: items,
		itemKey: 'id',
		renderItem: item => (
			<div className='max-w-80 border-b px-3 py-1 last:border-b-0'>
				<h3 className='line-clamp-2 font-semibold'>{item.title}</h3>
				<p className='line-clamp-2 text-sm text-gray-700'>{item.description}</p>
			</div>
		),
		classNames: {
			root: 'h-96',
		},
	},
};
