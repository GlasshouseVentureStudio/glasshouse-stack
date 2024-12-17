import { type RefObject } from 'react';
import { Box, type BoxProps, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';
import {
	MRT_GlobalFilterTextInput,
	MRT_ProgressBar,
	type MRT_RowData,
	MRT_TablePagination,
	MRT_ToolbarAlertBanner,
	MRT_ToolbarDropZone,
} from 'mantine-react-table';

import { type DataTableInstance } from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';
import { ToolbarInternalButtons } from './toolbar-internal-buttons';

import commonClasses from './common.module.css';
import classes from './top-toolbar.module.css';

interface TopToolbarProps<TData extends MRT_RowData> extends BoxProps {
	table: DataTableInstance<TData>;
}

export const TopToolbar = <TData extends MRT_RowData>({ table, ...rest }: TopToolbarProps<TData>) => {
	const {
		getState,
		options: {
			enableGlobalFilter,
			enablePagination,
			enableToolbarInternalActions,
			mantineTopToolbarProps,
			positionGlobalFilter,
			positionPagination,
			positionToolbarAlertBanner,
			positionToolbarDropZone,
			renderTopToolbarCustomActions,
		},
		refs: { topToolbarRef },
	} = table;

	const { isFullScreen, showGlobalFilter } = getState();

	const isMobile = useMediaQuery('(max-width:720px)');
	const isTablet = useMediaQuery('(max-width:1024px)');

	const toolbarProps = {
		...resolveComponentProps(mantineTopToolbarProps, { table }),
		...rest,
	};

	const stackAlertBanner = isMobile ? Boolean(renderTopToolbarCustomActions) || (showGlobalFilter && isTablet) : false;

	const globalFilterProps = {
		style: !isTablet
			? {
					zIndex: 3,
				}
			: undefined,
		table,
	};

	return (
		<Box
			{...toolbarProps}
			ref={node => {
				if (node) {
					// eslint-disable-next-line react-compiler/react-compiler -- required to reassign ref
					topToolbarRef.current = node;

					if ('ref' in toolbarProps && toolbarProps.ref) {
						(toolbarProps.ref as RefObject<HTMLDivElement | null>).current = node;
					}
				}
			}}
			className={clsx(
				commonClasses['common-toolbar-styles'],
				classes.root,
				isFullScreen && classes['root-fullscreen'],
				toolbarProps.className
			)}
		>
			{positionToolbarAlertBanner === 'top' && (
				<MRT_ToolbarAlertBanner
					stackAlertBanner={stackAlertBanner}
					table={table}
				/>
			)}
			{['both', 'top'].includes(positionToolbarDropZone ?? '') && <MRT_ToolbarDropZone table={table} />}
			<Flex
				className={clsx(classes['actions-container'], stackAlertBanner && classes['actions-container-stack-alert'])}
			>
				{enableGlobalFilter && positionGlobalFilter === 'left' ? (
					<MRT_GlobalFilterTextInput {...globalFilterProps} />
				) : null}
				{renderTopToolbarCustomActions?.({ table }) ?? <span />}
				{enableToolbarInternalActions ? (
					<Flex
						justify='end'
						wrap='wrap-reverse'
					>
						{enableGlobalFilter && positionGlobalFilter === 'right' ? (
							<MRT_GlobalFilterTextInput {...globalFilterProps} />
						) : null}
						<ToolbarInternalButtons table={table} />
					</Flex>
				) : (
					enableGlobalFilter && positionGlobalFilter === 'right' && <MRT_GlobalFilterTextInput {...globalFilterProps} />
				)}
			</Flex>
			{enablePagination && ['both', 'top'].includes(positionPagination ?? '') ? (
				<Flex justify='end'>
					<MRT_TablePagination
						position='top'
						table={table}
					/>
				</Flex>
			) : null}
			<MRT_ProgressBar
				isTopToolbar
				table={table}
			/>
		</Box>
	);
};
