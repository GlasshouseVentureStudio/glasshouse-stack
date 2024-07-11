import { type QueryFunction, type QueryKey } from '@tanstack/react-query';

import { type ListProps } from '../list/list.types';

export interface DataListProps<T extends object> extends Omit<ListProps<T>, 'data'> {
	/**
	 * The query key for `@tanstack/react-query` query.
	 */
	queryKey: QueryKey;

	/**
	 * The function that fetches the data for `@tanstack/react-query` query.
	 */
	queryFn: QueryFunction<T[] | undefined, QueryKey, number> | undefined;
}

/**
 * The props for the data list server component.
 * @template T The type of the item.
 * @prop `queryKey` - The query key for `@tanstack/react-query` query.
 * @prop `children` - The children to render.
 * @prop `initialData` - The initial data for the query.
 */
export interface DataListServerProps<T> {
	/**
	 * The query key for `@tanstack/react-query` query.
	 */
	queryKey: QueryKey;
	/**
	 * The children to render.
	 */
	children: React.ReactNode;
	/**
	 * The initial data for the query.
	 */
	initialData: T | Promise<T>;
}
