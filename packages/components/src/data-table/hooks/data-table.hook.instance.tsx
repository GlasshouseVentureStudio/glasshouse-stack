import { type MRT_RowData, type MRT_TableOptions, useMantineReactTable } from 'mantine-react-table';

import { useDataTableEffects } from './data-table.hook.effects';

export const useDataTableInstance = <TData extends MRT_RowData>(options: MRT_TableOptions<TData>) => {
	const table = useMantineReactTable(options);

	useDataTableEffects(table);

	return table;
};
