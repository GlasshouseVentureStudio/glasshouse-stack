import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { type DataListServerProps } from './data-list.types';

export const DataListHydrationBoundary = async <T,>({ queryKey, children, initialData }: DataListServerProps<T>) => {
	const data = await Promise.resolve(initialData);
	const queryClient = new QueryClient();

	queryClient.setQueryData(queryKey, {
		pageParams: [0],
		pages: [data],
	});

	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
