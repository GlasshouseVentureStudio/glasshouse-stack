'use client';

import { useCallback } from 'react';
import { List } from '@glasshouse/components';
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';

import { type User } from './list-demo';

const getFullName = (data: User): string => {
	return `${data.firstName} ${data.lastName}`;
};

export const ListDemoClient = ({ data }: { data: User[] }) => {
	const renderItem = useCallback(
		(item: User) => (
			<Group
				h={62}
				justify='space-between'
				p={10}
			>
				<Group>
					<Avatar
						color='initials'
						name={getFullName(item)}
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
					align='flex-end'
					gap={0}
				>
					<Text className='text-sm'>{item.company.title}</Text>
					<Text
						c='dimmed'
						className='text-xs'
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
				estimateItemSize={() => 62}
				itemKey='id'
				renderItem={renderItem}
			/>
		</Paper>
	);
};
