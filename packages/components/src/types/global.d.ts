/* eslint-disable @typescript-eslint/naming-convention -- 3rd party*/
import { type Dispatch, type MutableRefObject, type ReactNode, type SetStateAction } from 'react';
import {
	type ActionIconProps,
	type AlertProps,
	type AutocompleteProps,
	type BadgeProps,
	type BoxProps,
	type CheckboxProps,
	type HighlightProps,
	type LoadingOverlayProps,
	type ModalProps,
	type MultiSelectProps,
	type PaperProps,
	type ProgressProps,
	type RadioProps,
	type RangeSliderProps,
	type SelectProps,
	type SkeletonProps,
	type SwitchProps,
	type TableProps,
	type TableTbodyProps,
	type TableTdProps,
	type TableTfootProps,
	type TableTheadProps,
	type TableThProps,
	type TableTrProps,
	type TextInputProps,
	type UnstyledButtonProps,
} from '@mantine/core';
import { type DateInputProps } from '@mantine/dates';
import { type DeepKeys, type OnChangeFn, type Table, type TableOptions } from '@tanstack/react-table';
import { type Virtualizer, type VirtualizerOptions } from '@tanstack/react-virtual';
import {
	type HTMLPropsRef,
	type LiteralUnion,
	type MRT_Cell,
	type MRT_Column,
	type MRT_ColumnDef,
	type MRT_ColumnFilterFnsState,
	type MRT_DensityState,
	type MRT_DisplayColumnDef,
	type MRT_DisplayColumnIds,
	type MRT_FilterOption,
	type MRT_Header,
	type MRT_HeaderGroup,
	type MRT_Icons,
	type MRT_InternalFilterOption,
	type MRT_Localization,
	type MRT_PaginationProps,
	type MRT_Row,
	type MRT_RowData,
	type MRT_RowModel,
	type MRT_TableState,
} from 'mantine-react-table';

declare module 'mantine-react-table' {
	type MRT_TableOptions<TData extends MRT_RowData> = Omit<
		Partial<TableOptions<TData>>,
		| 'columns'
		| 'data'
		| 'defaultColumn'
		| 'enableRowSelection'
		| 'expandRowsFn'
		| 'getRowId'
		| 'globalFilterFn'
		| 'initialState'
		| 'onStateChange'
		| 'state'
	> & {
		columnFilterDisplayMode?: 'custom' | 'popover' | 'subheader';
		columnFilterModeOptions?: LiteralUnion<string & MRT_FilterOption>[] | null;
		columnVirtualizerInstanceRef?: MutableRefObject<Virtualizer<HTMLDivElement, HTMLTableCellElement> | null>;
		columnVirtualizerOptions?:
			| ((props: {
					table: MRT_TableInstance<TData>;
			  }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>)
			| Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>;
		columnsControlMenuProps?: {
			withQuickActions?: boolean;
		};
		/**
		 * The columns to display in the table. `accessorKey`s or `accessorFn`s must match keys in the `data` prop.
		 *
		 * See more info on creating columns on the official docs site:
		 * @link https://www.mantine-react-table.com/docs/guides/data-columns
		 * @link https://www.mantine-react-table.com/docs/guides/display-columns
		 *
		 * See all Columns Options on the official docs site:
		 * @link https://www.mantine-react-table.com/docs/api/column-options
		 */
		columns: MRT_ColumnDef<TData>[];
		createDisplayMode?: 'custom' | 'modal' | 'row';
		/**
		 * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
		 *
		 * See the usage guide for more info on creating columns and data:
		 * @link https://www.mantine-react-table.com/docs/getting-started/usage
		 */
		data: TData[];
		/**
		 * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
		 */
		defaultColumn?: Partial<MRT_ColumnDef<TData>>;
		/**
		 * Change the default options for display columns.
		 */
		defaultDisplayColumn?: Partial<MRT_DisplayColumnDef<TData>>;
		displayColumnDefOptions?: Partial<{
			[key in MRT_DisplayColumnIds]: Partial<MRT_DisplayColumnDef<TData>>;
		}>;
		editDisplayMode?: 'cell' | 'custom' | 'modal' | 'row' | 'table';
		enableBatchRowSelection?: boolean;
		enableBottomToolbar?: boolean;
		enableClickToCopy?: ((cell: MRT_Cell<TData>) => boolean) | boolean;
		enableColumnActions?: boolean;
		enableColumnDragging?: boolean;
		enableColumnFilterModes?: boolean;
		enableColumnOrdering?: boolean;
		enableColumnVirtualization?: boolean;
		enableDensityToggle?: boolean;
		enableEditing?: ((row: MRT_Row<TData>) => boolean) | boolean;
		enableExpandAll?: boolean;
		enableFacetedValues?: boolean;
		enableFilterMatchHighlighting?: boolean;
		enableFullScreenToggle?: boolean;
		enableGlobalFilterModes?: boolean;
		enableGlobalFilterRankedResults?: boolean;
		enableHeaderActionsHoverReveal?: boolean;
		enablePagination?: boolean;
		enableRowActions?: boolean;
		enableRowDragging?: boolean;
		enableRowNumbers?: boolean;
		enableRowOrdering?: boolean;
		enableRowSelection?: ((row: MRT_Row<TData>) => boolean) | boolean;
		enableRowVirtualization?: boolean;
		enableSelectAll?: boolean;
		enableStickyFooter?: boolean;
		enableStickyHeader?: boolean;
		enableTableFooter?: boolean;
		enableTableHead?: boolean;
		enableToolbarInternalActions?: boolean;
		enableTopToolbar?: boolean;
		expandRowsFn?: (dataRow: TData) => TData[];
		getRowId?: (originalRow: TData, index: number, parentRow: MRT_Row<TData>) => string | undefined;
		globalFilterFn?: MRT_FilterOption;
		globalFilterModeOptions?: MRT_FilterOption[] | null;
		icons?: Partial<MRT_Icons>;
		initialState?: Partial<MRT_TableState<TData>>;
		/**
		 * Changes which kind of CSS layout is used to render the table. `semantic` uses default semantic HTML elements, while `grid` adds CSS grid and flexbox styles
		 */
		layoutMode?: 'grid' | 'grid-no-grow' | 'semantic';
		/**
		 * Pass in either a locale imported from `mantine-react-table/locales/*` or a custom locale object.
		 *
		 * See the localization (i18n) guide for more info:
		 * @link https://www.mantine-react-table.com/docs/guides/localization
		 */
		localization?: Partial<MRT_Localization>;
		mantineBottomToolbarProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
			| (HTMLPropsRef<HTMLDivElement> & BoxProps);
		mantineColumnActionsButtonProps?:
			| ((props: {
					column: MRT_Column<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
		mantineColumnDragHandleProps?:
			| ((props: {
					column: MRT_Column<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
		mantineCopyButtonProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>);
		mantineCreateRowModalProps?:
			| ((props: {
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>)
			| (HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>);
		mantineDetailPanelProps?:
			| ((props: {
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps)
			| (HTMLPropsRef<HTMLTableCellElement> & BoxProps);
		mantineEditRowModalProps?:
			| ((props: {
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>)
			| (HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>);
		mantineEditSelectProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
		mantineEditTextInputProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
		mantineExpandAllButtonProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
		mantineExpandButtonProps?:
			| ((props: {
					renderedRowIndex?: number;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
		mantineFilterAutocompleteProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>);
		mantineFilterCheckboxProps?:
			| ((props: {
					column: MRT_Column<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<CheckboxProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<CheckboxProps>);
		mantineFilterDateInputProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>);
		mantineFilterMultiSelectProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>);
		mantineFilterRangeSliderProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>);
		mantineFilterSelectProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
		mantineFilterTextInputProps?:
			| ((props: {
					column: MRT_Column<TData>;
					rangeFilterIndex?: number;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
		mantineHighlightProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLSpanElement> & Partial<HighlightProps>)
			| (HTMLPropsRef<HTMLSpanElement> & Partial<HighlightProps>);
		mantineLoadingOverlayProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & Partial<LoadingOverlayProps>)
			| (HTMLPropsRef<HTMLDivElement> & Partial<LoadingOverlayProps>);
		mantinePaginationProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => Partial<HTMLPropsRef<HTMLDivElement> & MRT_PaginationProps>)
			| Partial<HTMLPropsRef<HTMLDivElement> & MRT_PaginationProps>;
		mantinePaperProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & PaperProps)
			| (HTMLPropsRef<HTMLDivElement> & PaperProps);
		mantineProgressProps?:
			| ((props: {
					isTopToolbar: boolean;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLDivElement> & ProgressProps)
			| (HTMLPropsRef<HTMLDivElement> & ProgressProps);
		mantineRowDragHandleProps?:
			| ((props: {
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
			| (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
		mantineSearchTextInputProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
			| (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
		mantineSelectAllCheckboxProps?:
			| ((props: {
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & (CheckboxProps | RadioProps | SwitchProps))
			| (HTMLPropsRef<HTMLInputElement> & (CheckboxProps | RadioProps | SwitchProps));
		mantineSelectCheckboxProps?:
			| ((props: {
					renderedRowIndex?: number;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLInputElement> & (CheckboxProps | RadioProps | SwitchProps))
			| (HTMLPropsRef<HTMLInputElement> & (CheckboxProps | RadioProps | SwitchProps));
		mantineSkeletonProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLDivElement> & SkeletonProps)
			| (HTMLPropsRef<HTMLDivElement> & SkeletonProps);
		mantineTableBodyCellProps?:
			| ((props: {
					cell: MRT_Cell<TData>;
					column: MRT_Column<TData>;
					renderedColumnIndex?: number;
					renderedRowIndex?: number;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableCellElement> & TableTdProps)
			| (HTMLPropsRef<HTMLTableCellElement> & TableTdProps);
		mantineTableBodyProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLTableSectionElement> & TableTbodyProps)
			| (HTMLPropsRef<HTMLTableSectionElement> & TableTbodyProps);
		mantineTableBodyRowProps?:
			| ((props: {
					isDetailPanel?: boolean;
					renderedRowIndex?: number;
					row: MRT_Row<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableRowElement> & TableTrProps)
			| (HTMLPropsRef<HTMLTableRowElement> & TableTrProps);
		mantineTableContainerProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
			| (HTMLPropsRef<HTMLDivElement> & BoxProps);
		mantineTableFooterCellProps?:
			| ((props: {
					column: MRT_Column<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableCellElement> & TableThProps)
			| (HTMLPropsRef<HTMLTableCellElement> & TableThProps);
		mantineTableFooterProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLTableSectionElement> & TableTfootProps)
			| (HTMLPropsRef<HTMLTableSectionElement> & TableTfootProps);
		mantineTableFooterRowProps?:
			| ((props: {
					footerGroup: MRT_HeaderGroup<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableRowElement> & TableTrProps)
			| (HTMLPropsRef<HTMLTableRowElement> & TableTrProps);
		mantineTableHeadCellProps?:
			| ((props: {
					column: MRT_Column<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableCellElement> & TableThProps)
			| (HTMLPropsRef<HTMLTableCellElement> & TableThProps);
		mantineTableHeadProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLTableSectionElement> & TableTheadProps)
			| (HTMLPropsRef<HTMLTableSectionElement> & TableTheadProps);
		mantineTableHeadRowProps?:
			| ((props: {
					headerGroup: MRT_HeaderGroup<TData>;
					table: MRT_TableInstance<TData>;
			  }) => HTMLPropsRef<HTMLTableRowElement> & TableTrProps)
			| (HTMLPropsRef<HTMLTableRowElement> & TableTrProps);
		mantineTableProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLTableElement> & TableProps)
			| (HTMLPropsRef<HTMLTableElement> & TableProps);
		mantineToolbarAlertBannerBadgeProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & Partial<BadgeProps>)
			| (HTMLPropsRef<HTMLDivElement> & Partial<BadgeProps>);
		mantineToolbarAlertBannerProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & Partial<AlertProps>)
			| (HTMLPropsRef<HTMLDivElement> & Partial<AlertProps>);
		mantineTopToolbarProps?:
			| ((props: { table: MRT_TableInstance<TData> }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
			| (HTMLPropsRef<HTMLDivElement> & BoxProps);
		/**
		 * Memoize cells, rows, or the entire table body to potentially improve render performance.
		 *
		 * @warning This will break some dynamic rendering features. See the memoization guide for more info:
		 * @link https://www.mantine-react-table.com/docs/guides/memoize-components
		 */
		memoMode?: 'cells' | 'rows' | 'table-body';
		onColumnFilterFnsChange?: OnChangeFn<Record<string, MRT_FilterOption>>;
		onCreatingRowCancel?: (props: { row: MRT_Row<TData>; table: MRT_TableInstance<TData> }) => void;
		onCreatingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
		onCreatingRowSave?: (props: {
			exitCreatingMode: () => void;
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
			values: Record<LiteralUnion<string & DeepKeys<TData>>, unknown>;
		}) => void;
		onDensityChange?: OnChangeFn<MRT_DensityState>;
		onDraggingColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
		onDraggingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
		onEditingCellChange?: OnChangeFn<MRT_Cell<TData> | null>;
		onEditingRowCancel?: (props: { row: MRT_Row<TData>; table: MRT_TableInstance<TData> }) => void;
		onEditingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
		onEditingRowSave?: (props: {
			exitEditingMode: () => void;
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
			values: Record<LiteralUnion<string & DeepKeys<TData>>, unknown>;
		}) => Promise<void> | void;
		onGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
		onHoveredColumnChange?: OnChangeFn<Partial<MRT_Column<TData>> | null>;
		onHoveredRowChange?: OnChangeFn<Partial<MRT_Row<TData>> | null>;
		onIsFullScreenChange?: OnChangeFn<boolean>;
		onShowAlertBannerChange?: OnChangeFn<boolean>;
		onShowColumnFiltersChange?: OnChangeFn<boolean>;
		onShowGlobalFilterChange?: OnChangeFn<boolean>;
		onShowToolbarDropZoneChange?: OnChangeFn<boolean>;
		paginationDisplayMode?: 'custom' | 'default' | 'pages';
		positionActionsColumn?: 'first' | 'last';
		positionCreatingRow?: 'bottom' | 'top' | number;
		positionExpandColumn?: 'first' | 'last';
		positionGlobalFilter?: 'left' | 'none' | 'right';
		positionPagination?: 'both' | 'bottom' | 'none' | 'top';
		positionToolbarAlertBanner?: 'bottom' | 'head-overlay' | 'none' | 'top';
		positionToolbarDropZone?: 'both' | 'bottom' | 'none' | 'top';
		renderBottomToolbar?: ((props: { table: MRT_TableInstance<TData> }) => ReactNode) | ReactNode;
		renderBottomToolbarCustomActions?: (props: { table: MRT_TableInstance<TData> }) => ReactNode;
		renderColumnActionsMenuItems?: (props: {
			column: MRT_Column<TData>;
			internalColumnMenuItems: ReactNode;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderColumnFilterModeMenuItems?: (props: {
			column: MRT_Column<TData>;
			internalFilterOptions: MRT_InternalFilterOption[];
			onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderCreateRowModalContent?: (props: {
			internalEditComponents: ReactNode[];
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderDetailPanel?: (props: { row: MRT_Row<TData>; table: MRT_TableInstance<TData> }) => ReactNode;
		renderEditRowModalContent?: (props: {
			internalEditComponents: ReactNode[];
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderEmptyRowsFallback?: (props: { table: MRT_TableInstance<TData> }) => ReactNode;
		renderGlobalFilterModeMenuItems?: (props: {
			internalFilterOptions: MRT_InternalFilterOption[];
			onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderRowActionMenuItems?: (props: {
			renderedRowIndex?: number;
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderRowActions?: (props: {
			cell: MRT_Cell<TData>;
			renderedRowIndex?: number;
			row: MRT_Row<TData>;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderToolbarAlertBannerContent?: (props: {
			groupedAlert: ReactNode | null;
			selectedAlert: ReactNode | null;
			table: MRT_TableInstance<TData>;
		}) => ReactNode;
		renderToolbarInternalActions?: (props: { table: MRT_TableInstance<TData> }) => ReactNode;
		renderTopToolbar?: ((props: { table: MRT_TableInstance<TData> }) => ReactNode) | ReactNode;
		renderTopToolbarCustomActions?: (props: { table: MRT_TableInstance<TData> }) => ReactNode;
		rowCount?: number;
		rowNumberDisplayMode?: 'original' | 'static';
		rowPinningDisplayMode?:
			| 'bottom'
			| 'select-bottom'
			| 'select-sticky'
			| 'select-top'
			| 'sticky'
			| 'top'
			| 'top-and-bottom';
		rowVirtualizerInstanceRef?: MutableRefObject<Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>;
		rowVirtualizerOptions?:
			| ((props: {
					table: MRT_TableInstance<TData>;
			  }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>)
			| Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>;
		selectAllMode?: 'all' | 'page';
		selectDisplayMode?: 'checkbox' | 'radio' | 'switch';
		/**
		 * Manage state externally any way you want, then pass it back into MRT.
		 */
		state?: Partial<MRT_TableState<TData>>;
	};

	type MRT_StatefulTableOptions<TData extends MRT_RowData> = MRT_DefinedTableOptions<TData> & {
		state: Pick<
			MRT_TableState<TData>,
			| 'columnFilterFns'
			| 'columnOrder'
			| 'columnSizingInfo'
			| 'creatingRow'
			| 'density'
			| 'draggingColumn'
			| 'draggingRow'
			| 'editingCell'
			| 'editingRow'
			| 'globalFilterFn'
			| 'grouping'
			| 'hoveredColumn'
			| 'hoveredRow'
			| 'isFullScreen'
			| 'pagination'
			| 'showAlertBanner'
			| 'showColumnFilters'
			| 'showGlobalFilter'
			| 'showToolbarDropZone'
		>;
	};

	type MRT_DefinedTableOptions<TData extends MRT_RowData> = Omit<MRT_TableOptions<TData>, 'icons' | 'localization'> & {
		icons: MRT_Icons;
		localization: MRT_Localization;
	};

	type MRT_TableInstance<TData extends MRT_RowData> = Omit<
		Table<TData>,
		| 'getAllColumns'
		| 'getAllFlatColumns'
		| 'getAllLeafColumns'
		| 'getBottomRows'
		| 'getCenterLeafColumns'
		| 'getCenterRows'
		| 'getColumn'
		| 'getExpandedRowModel'
		| 'getFlatHeaders'
		| 'getHeaderGroups'
		| 'getLeftLeafColumns'
		| 'getPaginationRowModel'
		| 'getPreFilteredRowModel'
		| 'getPrePaginationRowModel'
		| 'getRightLeafColumns'
		| 'getRowModel'
		| 'getSelectedRowModel'
		| 'getState'
		| 'getTopRows'
		| 'options'
	> & {
		getAllColumns: () => MRT_Column<TData>[];
		getAllFlatColumns: () => MRT_Column<TData>[];
		getAllLeafColumns: () => MRT_Column<TData>[];
		getBottomRows: () => MRT_Row<TData>[];
		getCenterLeafColumns: () => MRT_Column<TData>[];
		getCenterRows: () => MRT_Row<TData>[];
		getColumn: (columnId: string) => MRT_Column<TData>;
		getExpandedRowModel: () => MRT_RowModel<TData>;
		getFilteredSelectedRowModel: () => MRT_RowModel<TData>;
		getFlatHeaders: () => MRT_Header<TData>[];
		getHeaderGroups: () => MRT_HeaderGroup<TData>[];
		getLeftLeafColumns: () => MRT_Column<TData>[];
		getPaginationRowModel: () => MRT_RowModel<TData>;
		getPreFilteredRowModel: () => MRT_RowModel<TData>;
		getPrePaginationRowModel: () => MRT_RowModel<TData>;
		getRightLeafColumns: () => MRT_Column<TData>[];
		getRowModel: () => MRT_RowModel<TData>;
		getSelectedRowModel: () => MRT_RowModel<TData>;
		getState: () => MRT_TableState<TData>;
		getTopRows: () => MRT_Row<TData>[];
		options: MRT_StatefulTableOptions<TData>;
		refs: {
			bottomToolbarRef: MutableRefObject<HTMLDivElement | null>;
			editInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
			filterInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
			lastSelectedRowId: MutableRefObject<null | string>;
			searchInputRef: MutableRefObject<HTMLInputElement | null>;
			tableContainerRef: MutableRefObject<HTMLDivElement | null>;
			tableFooterRef: MutableRefObject<HTMLTableSectionElement | null>;
			tableHeadCellRefs: MutableRefObject<Record<string, HTMLTableCellElement>>;
			tableHeadRef: MutableRefObject<HTMLTableSectionElement | null>;
			tablePaperRef: MutableRefObject<HTMLDivElement | null>;
			topToolbarRef: MutableRefObject<HTMLDivElement | null>;
		};
		setColumnFilterFns: Dispatch<SetStateAction<MRT_ColumnFilterFnsState>>;
		setCreatingRow: Dispatch<SetStateAction<MRT_Row<TData> | null | true>>;
		setDensity: Dispatch<SetStateAction<MRT_DensityState>>;
		setDraggingColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
		setDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
		setEditingCell: Dispatch<SetStateAction<MRT_Cell<TData> | null>>;
		setEditingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
		setGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
		setHoveredColumn: Dispatch<SetStateAction<Partial<MRT_Column<TData>> | null>>;
		setHoveredRow: Dispatch<SetStateAction<Partial<MRT_Row<TData>> | null>>;
		setIsFullScreen: Dispatch<SetStateAction<boolean>>;
		setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
		setShowColumnFilters: Dispatch<SetStateAction<boolean>>;
		setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
		setShowToolbarDropZone: Dispatch<SetStateAction<boolean>>;
	};
}
