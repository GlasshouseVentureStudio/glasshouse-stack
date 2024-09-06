import { createSafeContext, type GetStylesApi } from '@mantine/core';

import { type ListFactory } from './list.types';

interface ListContextValue<T extends object> {
	getStyles: GetStylesApi<ListFactory<T>>;
}

const createListContext = <T extends object>() =>
	createSafeContext<ListContextValue<T>>('Card component was not found in tree');

export const [ListProvider, useListContext] = createListContext();
