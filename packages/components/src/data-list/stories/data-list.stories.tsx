/* eslint-disable react-hooks/rules-of-hooks -- safe for stories */
import { useCallback, useState } from 'react';
import { Box, Group, Select, Stack, Switch, Text } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import groupBy from 'lodash.groupby';

import { DataList } from '../data-list';
import { getDummyComments, getDummyUsers } from './api';
import { type Comment, type GetDummyCommentsParams, type GetDummyUsersParams, type User } from './types';

const meta: Meta<typeof DataList<Comment>> = {
	title: 'Components/Lists/DataList',
	component: DataList,
	tags: ['autodocs', 'lists'],
};

export default meta;
type DataListStory = StoryObj<typeof meta>;

/**
 * Default configuration for the DataListStory.
 */
export const Detault: DataListStory = {
	render: () => {
		const fetchFn = async (params: GetDummyCommentsParams) => {
			const data = await getDummyComments(params);

			return data;
		};

		return (
			<DataList
				className='h-80'
				dataSelector={({ pages, pageParams }) => ({
					pages: pages.flatMap(page => page.comments),
					pageParams,
				})}
				estimateItemSize={() => 32}
				fetchFn={fetchFn}
				initialPageParam={{
					limit: 20,
					skip: 0,
				}}
				itemKey={item => item.id}
				queryOptions={{
					queryKey: ['data-list-comments'],
					getNextPageParam: (lastPage, allPages, lastPageParam) => {
						if (lastPageParam.skip < lastPage.total) {
							return {
								skip: lastPageParam.skip + lastPage.limit,
								limit: lastPage.limit,
							};
						}

						return undefined;
					},
				}}
				renderItem={item => {
					return <Text className='line-clamp-1 px-3 py-1'>{item.body}</Text>;
				}}
			/>
		);
	},
};

type UsersDataListStory = StoryObj<Meta<typeof DataList<User>>>;

/**
 * Represents a grouped data list story.
 */
export const GroupedDataList: UsersDataListStory = {
	render: () => {
		const [sticky, setSticky] = useState(false);
		const [sortBy, setSortBy] = useState<keyof User>('firstName');
		const [order, setOrder] = useState<'asc' | 'desc'>('asc');

		const fetchFn = useCallback(
			async (params: GetDummyUsersParams) => {
				const data = await getDummyUsers({
					...params,
					sortBy,
					order,
				});

				return data;
			},
			[order, sortBy]
		);

		const sortByOptions: { value: keyof User; label: string }[] = [
			{
				label: 'First name',
				value: 'firstName',
			},
			{
				label: 'Last name',
				value: 'lastName',
			},
		];

		return (
			<Stack>
				<DataList
					className='h-80'
					dataSelector={({ pages, pageParams }) => ({
						pages: pages.flatMap(page => page.users),
						pageParams,
					})}
					estimateGroupHeaderSize={() => 32}
					estimateItemSize={() => 32}
					fetchFn={fetchFn}
					groupByFn={items => groupBy(items, item => item.firstName.toLowerCase()[0])}
					initialPageParam={{
						skip: 0,
						limit: 20,
						sortBy: 'firstName',
						order: 'asc',
					}}
					itemKey={item => item.id}
					queryOptions={{
						queryKey: ['data-list-comments', order, sortBy],
						getNextPageParam: (lastPage, _, lastPageParam) => {
							if (lastPageParam.skip < lastPage.total) {
								const params: GetDummyUsersParams = {
									limit: lastPage.limit,
									skip: lastPageParam.skip + lastPage.limit,
									sortBy,
									order,
								};

								return params;
							}

							return undefined;
						},
					}}
					renderGroupHeader={group => (
						<Box bg='blue'>
							<Text className='sticky top-0 line-clamp-1 px-3 py-1 font-bold uppercase text-white'>{group.title}</Text>
						</Box>
					)}
					renderItem={item => {
						return <Text className='line-clamp-1 px-3 py-1'>{item.firstName}</Text>;
					}}
					stickyGroupHeader={sticky}
				/>
				<Group>
					<Select
						checkIconPosition='right'
						data={sortByOptions}
						label='Sort by'
						onChange={value => {
							setSortBy(value as unknown as keyof User);
						}}
						placeholder='Sort by'
						value={sortBy}
					/>
					<Select
						checkIconPosition='right'
						data={[
							{
								label: 'Ascending',
								value: 'asc',
							},
							{
								label: 'Descending',
								value: 'desc',
							},
						]}
						label='Order'
						onChange={value => {
							setOrder(value as 'asc' | 'desc');
						}}
						placeholder='Order'
						value={order}
					/>
					<Switch
						checked={sticky}
						label='Sticky group header'
						onChange={event => {
							setSticky(event.currentTarget.checked);
						}}
					/>
				</Group>
			</Stack>
		);
	},
};
