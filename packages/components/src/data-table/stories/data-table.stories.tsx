import { faker } from '@faker-js/faker';
import { ActionIcon, CSSProperties } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
	useInfiniteQuery,
	useQuery,
	type QueryKey,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import omit from 'lodash.omit';
import { EyeIcon, PencilIcon, PinIcon, TrashIcon } from 'lucide-react';
import { type MRT_ColumnDef } from 'mantine-react-table';

import { useRef, useState } from 'react';
import { getDummyUsers } from '../../data-list/stories/api';
import { GetDummyUsersParams, User } from '../../data-list/stories/types';
import { TextAreaCellEdit } from '../cell-edit/textarea-cell-edit';
import { DataTable } from '../data-table';
import {
	DataTableBaseProps,
	DataTableOptions,
	DataTableWithInfiniteQueryProps,
	type DataTableProps,
	type GetDataFn,
} from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';
import { useDataTable } from '../hooks';

const meta: Meta = {
	title: 'Components/DataTable/Generic',
	component: DataTable,
	decorators: [
		Story => {
			const queryClient = new QueryClient();

			return (
				<QueryClientProvider client={queryClient}>
					<Story />
				</QueryClientProvider>
			);
		},
	],
	tags: ['autodocs', 'DataTable'],
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
		Edit: props => <TextAreaCellEdit {...props} />,
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
		enableRowPinning: true,
		rowPinningDisplayMode: 'top',
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
			<ActionIcon.Group variant='default'>
				<ActionIcon size='xs'>
					<EyeIcon size={12} />
				</ActionIcon>
				<ActionIcon
					size='xs'
					onClick={() => {
						table.setEditingRow(row);
					}}
				>
					<PencilIcon size={12} />
				</ActionIcon>
				<ActionIcon
					size='xs'
					onClick={() => {
						row.pin('top');
					}}
				>
					<PinIcon
						className='gvs-rotate-180'
						size={12}
					/>
				</ActionIcon>
				<ActionIcon
					size='xs'
					onClick={() => {
						row.pin('bottom');
					}}
				>
					<PinIcon size={12} />
				</ActionIcon>
				<ActionIcon
					color='red'
					size='xs'
				>
					<TrashIcon size={12} />
				</ActionIcon>
			</ActionIcon.Group>
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

const getData: GetDataFn<DataType, { data: DataType[]; total: number }> = (_, { pagination }) => {
	return new Promise<{ data: DataType[]; total: number }>(resolve => {
		setTimeout(() => {
			resolve({
				data: bigData.slice(
					pagination.pageIndex * pagination.pageSize,
					(pagination.pageIndex + 1) * pagination.pageSize
				),
				total: 123456,
			});
		}, 400);
	});
};

const getInfiniteData: GetDataFn<
	DataType,
	{ data: DataType[]; total: number },
	QueryKey,
	{ pageSize: number; pageIndex: number }
> = ({ pageParam }) => {
	return new Promise<{ data: DataType[]; total: number }>(resolve => {
		setTimeout(() => {
			resolve({
				data: bigData.slice(pageParam.pageIndex * pageParam.pageSize, (pageParam.pageIndex + 1) * pageParam.pageSize),
				total: 123456,
			});
		}, 10000);
	});
};

export const FullFeatureWithQuery: StoryObj<DataTableProps<DataType>> = {
	args: {
		...omit(FullFeatures.args, 'data'),
	},
	render: (props: DataTableProps<DataType>) => {
		return (
			<DataTable
				{...omit(props, 'data')}
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
				getData={getInfiniteData}
				infinite
				mantineTableContainerProps={{
					style: {
						maxHeight: 488,
					},
				}}
				queryOptions={{
					queryKey: ['FullFeatureWithInfiniteQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, _, lastPageParams) =>
						lastPageParams.pageIndex * lastPage.data.length < lastPage.total
							? { pageIndex: lastPageParams.pageIndex + 1, pageSize: 20 }
							: null,
					initialPageParam: { pageSize: 20, pageIndex: 0 },
				}}
			/>
		);
	},
};

export const WithUseDataTableHookQuery: StoryObj<DataTableProps<User>> = {
	name: 'With useDataTable hook (and useQuery)',
	render: (props: DataTableProps<User>) => {
		const [pagination, setPagination] = useState({
			pageIndex: 0,
			pageSize: 10,
		});

		const params: GetDummyUsersParams = {
			limit: pagination.pageSize,
			skip: pagination.pageIndex * pagination.pageSize,
		};

		const getData = () => getDummyUsers(params);

		const { data, isLoading, isFetching } = useQuery({
			queryKey: ['WithUseDataTableHook', params],
			queryFn: getData,
			placeholderData: keepPreviousData,
		});

		const users = data?.users ?? [];

		const columns: MRT_ColumnDef<User>[] = [
			{
				accessorKey: 'firstName',
				header: 'First Name',
			},
			{
				accessorKey: 'lastName',
				header: 'Last Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
			},
		];

		const table = useDataTable({
			columns,
			data: users,
			rowCount: data?.total,
			enablePagination: true,
			enableBottomToolbar: true,
			paginationDisplayMode: 'default',
			onPaginationChange: setPagination,
			state: {
				pagination,
				isLoading: isFetching && !isLoading,
				showSkeletons: isLoading,
			},
			manualPagination: true,
			pageCount: Math.ceil((data?.total ?? 0) / 10),
			...omit(props, ['columns', 'getData', 'queryOptions', 'infinite']),
		});

		return <DataTable table={table} />;
	},
};

export const WithUseDataTableHookInfiniteQuery: StoryObj<DataTableProps<User>> = {
	name: 'With useDataTable hook (and useInfiniteQuery)',
	render: (props: DataTableProps<User>) => {
		const params: GetDummyUsersParams = {
			limit: 25,
			skip: 0,
		};

		const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
			queryKey: ['WithUseDataTableHookExternalQuery', params],
			queryFn: ({ pageParam }) => getDummyUsers({ ...params, skip: pageParam }),
			placeholderData: keepPreviousData,
			initialPageParam: 0,
			getNextPageParam: lastPage => {
				const skip = lastPage.skip + lastPage.limit;

				if (lastPage.users.length < lastPage.limit) {
					return undefined;
				}

				return skip;
			},
		});

		const users = data?.pages.flatMap(page => page.users ?? []) ?? [];
		const total = data?.pages[0]?.total ?? 0;

		const columns: MRT_ColumnDef<User>[] = [
			{
				accessorKey: 'firstName',
				header: 'First Name',
			},
			{
				accessorKey: 'lastName',
				header: 'Last Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
			},
		];

		const tableContainerRef = useRef<HTMLDivElement>(null);

		const mantineTableContainerProps: DataTableOptions<User>['mantineTableContainerProps'] = props => {
			const resolvedProps = resolveComponentProps(
				props,
				(props as unknown as DataTableBaseProps<User>).mantineTableContainerProps
			);
			const resolvedStyle = resolvedProps?.style as CSSProperties;

			return {
				...resolvedProps,
				ref: tableContainerRef,
				style: { maxHeight: 400, ...resolvedStyle },
				onScroll: e => {
					const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

					const scrollThreshold = (props as unknown as DataTableWithInfiniteQueryProps<User>).scrollThreshold ?? 0.25;
					const threshold =
						typeof scrollThreshold === 'number' ? scrollThreshold : parseInt(scrollThreshold.replace('px', ''));

					if (
						scrollHeight - scrollTop - clientHeight <
							(typeof scrollThreshold === 'number' ? clientHeight * (1 - threshold) : threshold) &&
						!isFetching &&
						hasNextPage
					) {
						void fetchNextPage();
					}
				},
			};
		};

		const table = useDataTable({
			columns,
			data: users,
			rowCount: total,
			mantineTableContainerProps,
			state: {
				isLoading: (isFetching || isFetchingNextPage) && !isLoading,
				showSkeletons: isLoading,
				showProgressBars: isFetchingNextPage,
			},
			...omit(props, ['columns', 'getData', 'queryOptions', 'infinite']),
		});

		return <DataTable table={table} />;
	},
};
