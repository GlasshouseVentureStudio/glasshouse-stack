import { type Meta, type StoryObj } from '@storybook/react';

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

export const Detault: DataListStory = {
	args: {
		queryKey: ['data-list'],
		queryFn: async () => {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
			const data = (await response.json()) as MockInterface[];

			return data;
		},
		getItemLabel: item => item.title,
	},
};
