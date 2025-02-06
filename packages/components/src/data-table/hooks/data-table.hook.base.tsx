'use client';

import { type MRT_RowData } from 'mantine-react-table';

import { useDataTableInstance } from './data-table.hook.instance';
import { type UseDataTableBaseOptions, useDataTableOptions } from './data-table.hook.options';

export const useDataTableBase = <TData extends MRT_RowData>(options: UseDataTableBaseOptions<TData>) =>
	useDataTableInstance(useDataTableOptions(options));
