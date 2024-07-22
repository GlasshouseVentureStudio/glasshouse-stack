import isFunction from 'lodash.isfunction';

export const resolveComponentProps = <TableProps, ComponentProps>(
	tableProps: TableProps,
	componentProps?: ((props: TableProps) => ComponentProps) | ComponentProps
) => {
	return isFunction(componentProps) ? componentProps(tableProps) : componentProps;
};
