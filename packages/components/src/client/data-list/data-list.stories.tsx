import { type Meta, type StoryObj } from '@storybook/react';
import groupBy from 'lodash.groupby';

import { DataList } from './data-list';

interface MockInterface {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const meta: Meta<typeof DataList<MockInterface>> = {
	title: 'Components/DataList',
	component: DataList,
	tags: ['autodocs'],
};

export default meta;
type DataListStory = StoryObj<typeof meta>;

/**
 * Default configuration for the DataListStory.
 */
export const Detault: DataListStory = {
	args: {
		queryKey: ['data-list'],
		queryFn: async () => {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
			const data = (await response.json()) as MockInterface[];

			return data;
		},
		renderItem: (item, index) => <p className='px-3 py-1'>{`${index + 1}. ${item.title}`}</p>,
		estimateItemSize: () => 32,
		className: 'h-96',
	},
};

/**
 * Represents a grouped data list story.
 */
export const GroupedDataList: DataListStory = {
	args: {
		...Detault.args,
		groupByFn: items => groupBy(items, item => item.title.toLowerCase()[0]),
		estimateGroupHeaderSize: () => 32,
		renderGroupHeader: title => (
			<p className='sticky top-0 bg-black px-3 py-1 font-bold uppercase text-white'>{title}</p>
		),
	},
};
