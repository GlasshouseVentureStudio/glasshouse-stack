'use client';

import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Center,
	Checkbox,
	type ComboboxItem,
	type ComboboxItemGroup,
	Divider,
	type MultiSelectProps,
	ScrollArea,
	Stack,
	TextInput,
} from '@mantine/core';
import { SearchIcon } from 'lucide-react';
import { type MRT_Column, type MRT_RowData } from 'mantine-react-table';

const getValue = (data: string | ComboboxItem | ComboboxItemGroup) => {
	if (typeof data === 'string') {
		return data;
	}

	if ('value' in data) {
		return data.value;
	}
};

const getLabel = (data: string | ComboboxItem | ComboboxItemGroup) => {
	if (typeof data === 'string') {
		return data;
	}

	if ('label' in data) {
		return data.label;
	}
};

// TODO: clear filter value if value is not included in data
export const MultiSelectFilter = <TData extends MRT_RowData, TValue = unknown>({
	column,
}: {
	column: MRT_Column<TData, TValue>;
}) => {
	const data = (column.columnDef.mantineFilterMultiSelectProps as MultiSelectProps).data ?? [];
	const [value, setValue] = useState<string[]>((column.getFilterValue() as string[] | undefined) ?? []);
	const [searchValue, setSearchValue] = useState('');
	const columnFilterValue = column.getFilterValue() as string[] | undefined;

	useEffect(() => {
		setValue(value => {
			if (
				value.every(v => (columnFilterValue ?? []).includes(v)) &&
				value.length === (columnFilterValue?.length ?? 0)
			) {
				return columnFilterValue ?? [];
			}

			return value;
		});
	}, [columnFilterValue]);

	return (
		<Box
			mx={-8}
			my={-4}
			w='calc(100% + 16px)'
		>
			<TextInput
				leftSection={<SearchIcon />}
				placeholder='Search'
				value={searchValue}
				width='100%'
				onChange={e => {
					setSearchValue(e.target.value);
				}}
			/>
			<ScrollArea.Autosize
				mah='40vh'
				scrollbarSize={6}
				type='always'
			>
				<Checkbox.Group
					value={value}
					onChange={value => {
						column.setFilterValue(value);
						setValue(value);
					}}
				>
					<Stack mt='xs'>
						{data
							.filter(item => getLabel(item)?.toLowerCase().includes(searchValue.toLowerCase()))
							.map(item => (
								<Checkbox
									key={getValue(item)}
									label={getLabel(item)}
									size='xs'
									value={getValue(item)}
								/>
							))}
					</Stack>
				</Checkbox.Group>
			</ScrollArea.Autosize>
			<Divider
				mx={-8}
				my={8}
			/>
			<Center>
				<Button
					color='black'
					fw={600}
					mx='auto'
					variant='subtle'
					onClick={() => {
						setValue([]);
						column.setFilterValue([]);
					}}
				>
					Clear all
				</Button>
			</Center>
		</Box>
	);
};
