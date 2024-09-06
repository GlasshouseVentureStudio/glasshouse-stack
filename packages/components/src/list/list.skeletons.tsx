import { rem, Skeleton, Stack } from '@mantine/core';

export const ListSkeletons = () => {
	return (
		<Stack p={rem(8)}>
			<Skeleton
				height={rem(16)}
				radius={9999}
			/>
			<Skeleton
				height={rem(16)}
				radius={9999}
			/>
			<Skeleton
				height={rem(16)}
				radius={9999}
			/>
		</Stack>
	);
};
