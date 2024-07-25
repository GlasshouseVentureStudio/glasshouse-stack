'use client';

import { useCallback } from 'react';
import { List } from '@glasshouse/components';
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';

import { type User } from './list-demo';

const getFullName = (data: User) => {
	return `${data.firstName} ${data.lastName}`;
};

export const ListDemoClient = ({ data }: { data: User[] }) => {
	const renderItem = useCallback(
		(item: User) => (
			<Group
				p={10}
				justify='space-between'
				h={62}
			>
				<Group>
					<Avatar
						name={getFullName(item)}
						color='initials'
					/>
					<Stack gap={0}>
						<Text>{`${item.firstName} ${item.lastName}`}</Text>
						<Text
							c='dimmed'
							className='text-xs'
						>
							{item.email}
						</Text>
					</Stack>
				</Group>
				<Stack
					gap={0}
					align='flex-end'
				>
					<Text className='text-sm'>{item.company.title}</Text>
					<Text
						className='text-xs'
						c='dimmed'
					>
						{item.company.department}
					</Text>
				</Stack>
			</Group>
		),
		[]
	);

	return (
		<Paper className='container h-96 max-w-screen-sm'>
			<List
				className='h-full w-full'
				data={data}
				renderItem={renderItem}
				estimateItemSize={() => 62}
				itemKey='id'
			/>
		</Paper>
	);
};
