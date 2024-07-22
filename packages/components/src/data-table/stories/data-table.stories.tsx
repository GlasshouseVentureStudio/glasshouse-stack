import { faker } from '@faker-js/faker';
import { ActionIcon, Group } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import omit from 'lodash.omit';
import { type MRT_ColumnDef } from 'mantine-react-table';

import { DataTable } from '../data-table';
import { type DataTableProps } from '../data-table.types';

const meta: Meta = {
	title: 'Components/DataTable/DataTable',
	component: DataTable,
	tags: ['autodocs', 'DataTables'],
};

const generateData = (length: number): DataType[] =>
	Array.from({ length }).map(() => ({
		id: faker.string.uuid(),
		prefix: faker.person.prefix(),
		firstName: faker.person.firstName(),
		middleName: faker.person.middleName(),
		lastName: faker.person.lastName(),
		jobType: faker.person.jobType(),
		job: faker.person.jobTitle(),
		dateOfBirth: faker.date.birthdate({ min: 1990, max: 2005, mode: 'year' }),
		zodiacSign: faker.person.zodiacSign(),
		children:
			Math.random() * 100 < 25
				? (Array.from({ length: Math.floor((Math.random() * 100) / 25) }).map(() => ({
						id: faker.string.uuid(),
						firstName: faker.person.firstName(),
						middleName: faker.person.middleName(),
						lastName: faker.person.lastName(),
						dateOfBirth: faker.date.birthdate({ min: 1990, max: 2005, mode: 'year' }),
						children: [] as DataType[],
					})) as DataType[])
				: [],
	}));

interface DataType {
	id: string;
	prefix: string;
	firstName: string;
	middleName: string;
	lastName: string;
	jobType: string;
	job: string;
	dateOfBirth: Date;
	zodiacSign: string;
	children: DataType[];
}

export default meta;

const columns: MRT_ColumnDef<DataType>[] = [
	{
		header: 'Prefix',
		accessorKey: 'prefix',
	},
	{
		header: 'First name',
		accessorKey: 'firstName',
	},
	{
		header: 'Middle name',
		accessorKey: 'middleName',
	},
	{
		header: 'Last name',
		accessorKey: 'lastName',
	},
	{
		header: 'Job type',
		accessorKey: 'jobType',
	},
	{
		header: 'Job title',
		accessorKey: 'job',
	},
	{
		header: 'Date of birth',
		accessorKey: 'dateOfBirth',
		Cell: ({ cell: { getValue } }) => (getValue() ? dayjs(getValue() as Date).format('DD-MMM-YYYY') : null),
	},
	{
		header: 'Zodiac sign',
		accessorKey: 'zodiacSign',
	},
];

export const Basic: StoryObj<DataTableProps<DataType>> = {
	args: {
		data: generateData(10),
		columns,
	},
};

export const Sorting: StoryObj<DataTableProps<DataType>> = {
	args: {
		...Basic.args,
		enableSorting: true,
	},
};

export const FullFeatures: StoryObj<DataTableProps<DataType>> = {
	args: {
		...Basic.args,
		data: generateData(100),
		columnFilterDisplayMode: 'popover',
		columnResizeDirection: 'ltr',
		columnResizeMode: 'onChange',
		displayColumnDefOptions: {
			'mrt-row-actions': {
				size: 136,
			},
		},
		editDisplayMode: 'cell',
		getRowId: ({ id }) => id,
		getRowCanExpand: row => row.original.children.length > 0,
		getSubRows: row => row.children,
		enableBatchRowSelection: false,
		enableBottomToolbar: true,
		enableClickToCopy: false,
		enableColumnActions: false,
		enableColumnDragging: true,
		enableColumnFilterModes: false,
		enableColumnFilters: true,
		enableColumnOrdering: true,
		enableColumnPinning: true,
		enableColumnResizing: true,
		enableColumnVirtualization: false,
		enableDensityToggle: false,
		enableEditing: false,
		enableExpandAll: false,
		enableExpanding: false,
		enableFacetedValues: false,
		enableFilterMatchHighlighting: true,
		enableFilters: true,
		enableFullScreenToggle: false,
		enableGlobalFilter: false,
		enableGlobalFilterModes: false,
		enableGlobalFilterRankedResults: false,
		enableGrouping: false,
		enableHeaderActionsHoverReveal: false,
		enableHiding: true,
		enableMultiRemove: false,
		enableMultiRowSelection: true,
		enableMultiSort: true,
		enablePagination: true,
		enableRowActions: true,
		enableRowDragging: true,
		enableRowNumbers: false,
		enableRowOrdering: false,
		enableRowPinning: false,
		enableRowSelection: true,
		enableRowVirtualization: false,
		enableSelectAll: true,
		enableSorting: true,
		enableSortingRemoval: true,
		enableStickyFooter: false,
		enableStickyHeader: true,
		enableSubRowSelection: true,
		enableTableFooter: true,
		enableTableHead: true,
		enableToolbarInternalActions: false,
		enableTopToolbar: false,
		positionActionsColumn: 'last',
		renderRowActions: ({ table, row }) => (
			<Group wrap='nowrap'>
				<ActionIcon size='sm'>
					<IconEye size={16} />
				</ActionIcon>
				<ActionIcon
					size='sm'
					variant='outline'
					onClick={() => {
						table.setEditingRow(row);
					}}
				>
					<IconEdit size={16} />
				</ActionIcon>
				<ActionIcon
					color='red'
					size='sm'
					variant='outline'
				>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		),
	},
	render: props => {
		return (
			<DataTable
				{...props}
				columns={columns}
				data={generateData(100)}
			/>
		);
	},
};

const bigData = generateData(123456);

const getData = ({
	pageIndex = 0,
	pageSize = 10,
}: {
	pageIndex?: number;
	pageSize?: number;
	orderBy?: string;
	orderDirection?: 'ASC' | 'DESC';
}) => {
	return new Promise<{ data: DataType[]; total: number }>(resolve => {
		setTimeout(() => {
			resolve({
				data: bigData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
				total: 123456,
			});
		}, 200);
	});
};

export const FullFeatureWithQuery: StoryObj<DataTableProps<DataType>> = {
	args: {
		...omit(FullFeatures.args, 'data'),
	},
	render: (props: DataTableProps<DataType>) => {
		return (
			<DataTable
				{...props}
				columns={columns}
				getData={getData}
				getRowCount={data => data?.total ?? 0}
				infinite={false}
				manualPagination
				queryOptions={{
					queryKey: ['FullFeatureWithQuery'],
					select: data => data.data,
				}}
			/>
		);
	},
};

export const FullFeatureWithInfiniteQuery: StoryObj<DataTableProps<DataType>> = {
	args: {
		...omit(FullFeatures.args, 'data'),
	},
	render: (props: DataTableProps<DataType>) => {
		return (
			<DataTable
				{...props}
				columns={columns}
				getData={getData}
				infinite
				mantineTableContainerProps={{
					style: {
						maxHeight: 488,
					},
				}}
				queryOptions={{
					queryKey: ['FullFeatureWithQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, allPages) =>
						(allPages.length - 1) * lastPage.data.length < lastPage.total ? allPages.length : null,
					initialPageParam: 0 as number,
				}}
			/>
		);
	},
};
