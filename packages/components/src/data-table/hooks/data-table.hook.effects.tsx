import { useEffect } from 'react';
import { type MRT_RowData, type MRT_TableInstance } from 'mantine-react-table';

import { type UseDataTableBaseOptions } from './data-table.hook.options';

export const useDataTableEffects = <TData extends MRT_RowData>(table: MRT_TableInstance<TData>) => {
	const { options, getState } = table;
	const { statesStorageProvider, statesStorageKey } = options as UseDataTableBaseOptions<TData>;

	const state = getState();

	useEffect(() => {
		if (statesStorageProvider) {
			const { set } = statesStorageProvider;

			set(state, statesStorageKey);
		}
	}, [state, statesStorageKey, statesStorageProvider]);
};
