import { Button, Flex, Text } from '@mantine/core';

import { type LoadMoreButtonProps } from '../data-table.types';

export const LoadMoreButton = ({ onClick, isFetching, hasNextPage }: LoadMoreButtonProps) => {
	return (
		<Flex
			align='center'
			justify='center'
		>
			{hasNextPage ? (
				<Button
					disabled={isFetching}
					onClick={onClick}
				>
					{isFetching ? 'Loading...' : 'Load more'}
				</Button>
			) : (
				<Text>No more data to load</Text>
			)}
		</Flex>
	);
};
