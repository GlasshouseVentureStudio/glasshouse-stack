import { ActionIcon, type ActionIconProps, Menu, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_RowData, type MRT_TableInstance } from 'mantine-react-table';

import { ColumnsControlMenu } from '../menus/columns-control-menu';

interface ColumnsControlButtonProps<TData extends MRT_RowData>
	extends ActionIconProps,
		HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

export const ColumnsControlButton = <TData extends MRT_RowData>({
	table,
	title,
	...rest
}: ColumnsControlButtonProps<TData>) => {
	const {
		icons,
		localization: { showHideColumns },
	} = table.options;

	const IconColumns = icons.IconColumns as React.FC;

	return (
		<Menu
			closeOnItemClick={false}
			withinPortal
		>
			<Tooltip
				label={title ?? showHideColumns}
				withinPortal
			>
				<Menu.Target>
					<ActionIcon
						aria-label={title ?? showHideColumns}
						color='gray'
						size='lg'
						variant='subtle'
						{...rest}
					>
						<IconColumns />
					</ActionIcon>
				</Menu.Target>
			</Tooltip>
			<ColumnsControlMenu table={table} />
		</Menu>
	);
};
