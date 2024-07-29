import { ActionIcon, Anchor, Avatar, Box, Button, Group, MantineProvider, Paper, rem, Tooltip } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
	IconCheckupList,
	IconCircleCheck,
	IconEdit,
	IconEye,
	IconNote,
	IconPaperclip,
	IconTrash,
	IconVocabulary,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import orderBy from 'lodash.orderby';
import uniqBy from 'lodash.uniqby';
import { createMRTColumnHelper, type MRT_ColumnDef, type MRT_TableState } from 'mantine-react-table';

import { DataTable } from '../data-table';
import { type DataTableProps, type GetDataFn } from '../data-table.types';
import { MultiSelectFilter } from '../filters/multi-select';
import pipelineData from './pipeline-data.json';

const IconFilter = () => (
	<svg
		fill='currentColor'
		height='1em'
		viewBox='0 0 20 20'
		width='1em'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			clipRule='evenodd'
			d='M4 6.8c0-.442.207-.8.462-.8h11.076c.255 0 .462.358.462.8s-.207.8-.461.8H4.462C4.207 7.6 4 7.242 4 6.8m1.848 3.477c0-.442.206-.8.461-.8h7.385c.255 0 .461.358.461.8 0 .441-.206.8-.461.8H6.309c-.255 0-.461-.359-.461-.8m2.461 3.48c0-.442.206-.8.461-.8h2.462c.255 0 .461.358.461.8s-.206.8-.461.8H8.77c-.255 0-.461-.358-.461-.8'
			fillRule='evenodd'
		/>
	</svg>
);

const meta: Meta = {
	title: 'Components/DataTable/Fandelo',
	component: DataTable,
	tags: ['autodocs', 'DataTable', 'Fandelo'],
};

const currencyFormatter = new Intl.NumberFormat('en-AU', {
	style: 'currency',
	currency: 'AUD',
});

interface PipelineData {
	responseData: {
		total: number;
		loadMore: boolean;
		data: Pipeline[];
	};
}

interface Pipeline {
	id: string;
	summary: string;
	client?: Client;
	talent?: Client;
	agency?: Agency;
	targetCompletionDate?: number;
	status?: Status;
	statusId?: string;
	competitorProbability?: number;
	value?: number;
	contacts?: {
		id: string;
		email: string;
		phoneNumber: string;
		displayName: string;
		phoneCode: string;
	}[];
	tasks?: {
		id: string;
		dueDate: number;
		summary: string;
		completedDate?: number;
		talent?: Client;
		agency: Agency;
		type: {
			key: string;
			value: string;
		};
		status: Status;
		opportunity: {
			id: string;
			summary: string;
		};
		cost?: number;
		extra?: number;
		sale?: number;
		chargeTo: string;
		creator?: Agency;
		priorityLevel: string;
		createdDate: number;
		countryCode?: string;
		venue?: string;
		statusId: string;
		opportunityId: string;
		startDate?: number;
		collaborators?: Collaborator[];
		assignee?: Collaborator;
		contact?: string;
		phone?: string;
		reminder?: {
			durationType: string;
			notificationTypes: string[];
			duration: number;
			key: string;
			value: string;
		};
		note?: string;
		description?: string;
		supplier?: {
			id: string;
			name: string;
		};
		recurrenceSetting?: string;
		recurrence?: {
			frequencyType: string;
			startDate: number;
			endDate: number;
			timeZoneId: string;
			lastDayOfMonth: boolean;
		};
		recurrenceId?: string;
	}[];
	createdDate: number;
	leads?: Collaborator[];
	collaborators?: Collaborator[];
	creator?: Agency;
	updatedDate: number;
	contract?: {
		id: string;
		status: string;
		pdfUrl?: string;
	};
	description?: string;
	medias?: {
		id: string;
		filename: string;
		contentType: string;
		cdnOrigin: string;
		type: string;
		opportunityId: string;
		originalFilename: string;
		uploadedDate: number;
	}[];
	notes?: {
		id: string;
		title: string;
		description: string;
		creator: Agency;
		createdDate: number;
		opportunityId: string;
	}[];
	comment?: string;
	hardCompletionDate?: number;
}

interface Collaborator {
	id: string;
	avatar?: {
		id: string;
		filename: string;
		contentType: string;
		url: string;
		uploadedDate: number;
		cdnOrigin: string;
		type: number;
		width: number;
		height: number;
		cdnLarge?: string;
		cdnMedium?: string;
		cdnSmall?: string;
	};
	displayName: string;
}

interface Status {
	id: string;
	statusName: string;
	useAsDefault: boolean;
	color: string;
	order: number;
	type: string;
	category: {
		id: string;
		code: string;
		label: string;
	};
	deletable: boolean;
}

interface Agency {
	id: string;
	displayName: string;
}

interface Client {
	id: string;
	displayName: string;
	assigned: boolean;
}

const getPipelineData: GetDataFn<Pipeline, PipelineData> = (_, tableState) => {
	const {
		columnFilters,
		pagination: { pageIndex, pageSize },
		sorting,
	} = tableState;
	const data = orderBy(
		pipelineData.responseData.data.filter(item => {
			return !columnFilters
				.map(({ id, value }) => {
					switch (id) {
						case 'client.displayName':
							return (value as string[] | undefined)?.length
								? (value as string[] | undefined)?.includes(item.client.id)
								: true;
						case 'talent.displayName':
							return (value as string[] | undefined)?.length
								? (value as string[] | undefined)?.includes(item.talent.id)
								: true;
						case 'value': {
							const hasValue = (value as [number | undefined, number | undefined] | undefined)?.length;
							const filterValue = value as [number | undefined, number | undefined] | undefined;
							const isGreater = item.value && (filterValue?.[0] ? item.value >= filterValue[0] : true);
							const isSmaller = item.value && (filterValue?.[1] ? item.value <= filterValue[1] : true);

							return hasValue ? isGreater && isSmaller : true;
						}
						default:
							return true;
					}
				})
				.some(filter => !filter);
		}),
		sorting[0]?.id,
		sorting[0]?.desc ? 'desc' : 'asc'
	);

	return new Promise<PipelineData>(resolve => {
		setTimeout(() => {
			resolve({
				...pipelineData,
				responseData: {
					...pipelineData.responseData,
					data: data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
					total: data.length,
				},
			});
		}, 400);
	});
};

export default meta;

const { accessor } = createMRTColumnHelper<Pipeline>();
const columns: MRT_ColumnDef<Pipeline>[] = [
	accessor('client.displayName', {
		header: 'Client',
		minSize: 80,
		size: 120,
		Filter: MultiSelectFilter,
		Cell: ({ cell: { getValue } }) => <Anchor fz='inherit'>{getValue()}</Anchor>,
		filterVariant: 'multi-select',
		mantineFilterMultiSelectProps: {
			data: uniqBy(
				(pipelineData.responseData.data as Pipeline[])
					.filter(item => item.client)
					.map(item => ({ label: item.client?.displayName ?? '', value: item.client?.id ?? '' })),
				'value'
			),
		},
	}),
	accessor('talent.displayName', {
		id: 'talent.displayName',
		header: 'Talent',
		minSize: 150,
		size: 150,
		Filter: MultiSelectFilter,
		Cell: ({ cell: { getValue } }) => <Anchor fz='inherit'>{getValue()}</Anchor>,
		mantineFilterMultiSelectProps: {
			data: uniqBy(
				(pipelineData.responseData.data as Pipeline[])
					.filter(item => item.talent)
					.map(item => ({ label: item.talent?.displayName ?? '', value: item.talent?.id ?? '' })),
				'value'
			),
		},
	}),
	{
		accessorKey: 'leads.0.displayName',
		id: 'leads.0.displayName',
		header: 'Lead',
		minSize: 88,
		size: 120,
		Cell: ({ cell: { getValue } }) => <Anchor fz='inherit'>{getValue<string>()}</Anchor>,
	},
	accessor('collaborators', {
		id: 'collaboratorIds',
		header: 'Collaborators',
		minSize: 157,
		size: 157,
		enableColumnFilter: true,
		enableSorting: false,
		Cell: ({ cell: { getValue } }) => (
			<div className='flex gap-1'>
				{getValue()?.map(item => (
					<Tooltip
						key={item.id}
						disabled={false}
						label={item.displayName}
					>
						<Anchor fz='inherit'>
							<Avatar
								color='primary'
								fz={10}
								name={item.displayName}
								size={20}
								variant='light'
							/>
						</Anchor>
					</Tooltip>
				))}
			</div>
		),
	}),
	{
		accessorKey: 'summary',
		id: 'summary',
		header: 'Summary',
		size: 330,
		enableColumnFilter: true,
		enableHiding: false,
	},
	{
		accessorKey: 'status.statusName',
		Cell: ({ cell: { row } }) => row.original.status?.statusName,
		meta: {
			delimiter: ',',
		},
		id: 'status.statusName',
		header: 'Status',
		minSize: 120,
		size: 120,
	},
	accessor('value', {
		Cell: ({ cell: { getValue } }) => ((getValue() ?? 0) > 0 ? currencyFormatter.format(getValue() ?? 0) : ''),
		id: 'value',
		header: 'Value',
		mantineTableBodyCellProps: {
			align: 'right',
		},
		mantineTableHeadCellProps: {
			align: 'right',
		},
		minSize: 88,
		filterVariant: 'range',
		size: 110,
	}),
	{
		accessorKey: 'contacts.0.displayName',
		id: 'contactName',
		header: 'Contact name',
		size: 144,
		enableColumnFilter: true,
		enableSorting: false,
	},
	{
		accessorKey: 'contacts.0.phoneNumber',
		id: 'contactPhone',
		header: 'Contact phone',
		size: 144,
		Cell: ({
			row: {
				original: { contacts },
			},
		}) => `${contacts?.[0]?.phoneCode ? `${contacts[0].phoneCode} ` : ''}${contacts?.[0]?.phoneNumber}`,
		enableColumnFilter: true,
		enableSorting: false,
	},
	{
		accessorKey: 'contacts.0.email',
		id: 'contactEmail',
		header: 'Contact email',
		size: 144,
		enableColumnFilter: true,
		enableSorting: false,
	},
	accessor('competitorProbability', {
		id: 'competitorProbability',
		header: 'Probability',
		Cell: ({ cell: { getValue } }) => (getValue() ? `${getValue()}%` : undefined),
		size: 120,
		enableColumnFilter: false,
	}),
	accessor('targetCompletionDate', {
		id: 'targetCompletionDate',
		Cell: ({ cell: { getValue } }) => (getValue() ? dayjs(getValue()).format('DD MMM YYYY') : undefined),
		header: 'Target date',
		minSize: 112,
		size: 112,
		enableColumnFilter: false,
	}),
];

export const FandeloOnePipeline: StoryObj<DataTableProps<Pipeline, PipelineData>> = {
	args: {
		columnDragHandleDisplayMode: 'cell',
		columnsControlMenuProps: {
			withColumnDragHandles: false,
			withColumnPinningButtons: false,
			withQuickActions: false,
		},
		columnFilterDisplayMode: 'popover',
		displayColumnDefOptions: {
			'mrt-table-actions': {
				size: 36,
				enablePinning: true,
			},
			'mrt-row-actions': {
				size: 142,
				enablePinning: true,
			},
		},
		enableBottomToolbar: true,
		enableColumnDragging: true,
		enableColumnFilters: true,
		enableColumnOrdering: true,
		enableColumnResizing: true,
		enableFilters: true,
		enableHiding: true,
		enablePagination: true,
		enablePinning: false,
		enableRowActions: true,
		enableSorting: true,
		manualFiltering: true,
		manualPagination: true,
		manualSorting: true,
		enableStickyHeader: true,
		enableTableActionsColumn: true,
		positionActionsColumn: 'last',
		renderDetailPanel: () => (
			<Box
				bg='blue.0'
				pb={16}
				px={8}
				w='100%'
			>
				<Paper p={16}>
					<Button.Group>
						<Button
							leftSection={<IconPaperclip />}
							radius='md'
							variant='default'
						>
							Attachments
						</Button>
						<Button
							leftSection={<IconCheckupList />}
							variant='default'
						>
							Tasks
						</Button>
						<Button
							leftSection={<IconNote />}
							radius='md'
							variant='default'
						>
							Notes
						</Button>
					</Button.Group>
				</Paper>
			</Box>
		),
		mantineDetailPanelProps: {
			display: 'block',
			bg: 'blue.0',
		},
		getRowCanExpand: () => true,
		getRowId: ({ id }) => id,
		icons: {
			IconFilter,
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 20,
			},
			columnVisibility: {
				contactPhone: false,
				contactEmail: false,
				contactName: false,
				collaboratorIds: false,
				probability: false,
			},
		},
		mantineTableHeadRowProps: {
			style: {
				borderRadius: 8,
				borderBottom: 'transparent',
			},
		},
		mantineTableHeadCellProps: ({ column }) => {
			const isFirstColumn = column.getIsFirstColumn('left') || column.getIsFirstColumn();
			const isLastColumn = column.getIsLastColumn('right') || column.getIsLastColumn();

			return {
				bg: 'gray.1',
				style: {
					...(isFirstColumn ? { borderTopLeftRadius: rem(8), borderBottomLeftRadius: rem(8) } : {}),
					...(isLastColumn ? { borderTopRightRadius: rem(8), borderBottomRightRadius: rem(8) } : {}),
				},
			};
		},
		mantinePaperProps: {
			withBorder: false,
			shadow: 'none',
		},
		mantineTableProps: {
			fz: 'xs',
			withTableBorder: false,
		},
		mantinePaginationProps: {
			siblings: 0,
			boundaries: 0,
		},
		paginationDisplayMode: 'simple',
		excludeStates: ['columnFilters', 'sorting'],
		statesStorageKey: 'PipelineTable',
		statesStorageProvider: {
			clear: key => {
				key && localStorage.removeItem(key);
			},
			set: (value, key) => {
				key && localStorage.setItem(key, JSON.stringify(value));
			},
			get: key => {
				return key ? (JSON.parse(localStorage.getItem(key) ?? '{}') as MRT_TableState<Pipeline>) : undefined;
			},
		},
		renderRowActions: ({ table, row }) => (
			<Group
				gap={8}
				wrap='nowrap'
			>
				<ActionIcon
					color='black'
					size='xs'
					variant='transparent'
				>
					<IconEye
						size={16}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon
					color='black'
					onClick={() => {
						table.setEditingRow(row);
					}}
					size='xs'
					variant='transparent'
				>
					<IconEdit
						size={16}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon
					color='black'
					size='xs'
					variant='transparent'
				>
					<IconVocabulary
						size={16}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon
					color='black'
					size='xs'
					variant='transparent'
				>
					<IconCircleCheck
						size={16}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon
					color='black'
					size='xs'
					variant='transparent'
				>
					<IconTrash
						size={16}
						stroke={1.5}
					/>
				</ActionIcon>
			</Group>
		),
	},
	render: (props: DataTableProps<Pipeline, PipelineData>) => {
		return (
			<MantineProvider
				theme={{
					spacing: {
						xs: rem(8),
					},
				}}
			>
				<DataTable
					{...props}
					columns={columns}
					getData={getPipelineData}
					getRowCount={data => data?.responseData.total ?? 0}
					infinite={false}
					manualPagination
					queryOptions={{
						queryKey: ['FandeloOnePipelineTable'],
						select: data => data.responseData.data,
					}}
				/>
			</MantineProvider>
		);
	},
};
