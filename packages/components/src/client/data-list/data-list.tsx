'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { List } from '../list';
import { type DataListProps } from './data-list.types';

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 50;

/**
 * A component that renders a list of items fetched from a query. This component uses the `useInfiniteQuery` hook from `react-query` to fetch data in pages. It also supports grouping items by a key. The list is rendered using the `List` component.
 */
export const DataList = <T extends object>({ queryKey, queryFn, ...props }: DataListProps<T>) => {
	const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
		queryKey,
		queryFn,
		initialPageParam: DEFAULT_PAGE_INDEX,
		getNextPageParam: (lastPage, pages) => {
			const lastDataLength = lastPage?.length ?? 0;

			if (lastDataLength < DEFAULT_PAGE_SIZE) {
				return undefined;
			}

			return pages.length;
		},
		refetchOnWindowFocus: false,
	});

	const items = data?.pages.map(d => d ?? []).flat() ?? [];

	const loaderRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			const target = entries[0];

			if (target?.isIntersecting && hasNextPage) {
				void fetchNextPage();
			}
		});

		const loader = loaderRef.current;

		if (loader) {
			observer.observe(loader);
		}

		return () => {
			if (loader) {
				observer.unobserve(loader);
			}
		};
	}, [fetchNextPage, hasNextPage]);

	return (
		<List
			{...props}
			data={items}
			loading={isLoading}
		/>
	);
};
