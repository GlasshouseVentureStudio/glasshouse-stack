import { useCallback, useState } from 'react';
import isEqual from 'lodash.isequal';

import { List } from '../list';
import { type SelectableListProps } from './select-list.types';

/**
 * A selectable list component. Extended from the `List` component.
 */
export const SelectList = <T extends object>({
	value: valueProp,
	onChange,
	onItemClick,
	...props
}: SelectableListProps<T>) => {
	const [value, setValue] = useState<T | undefined>(valueProp);

	const realValue = valueProp ? valueProp : value;

	const handleItemClick = (event: React.MouseEvent<HTMLLIElement>, item: T, index: number) => {
		onItemClick?.(event, item, index);
		onChange?.(item);
		setValue(prev => (isEqual(prev, item) ? undefined : item));
	};

	const getActiveItem = useCallback((item: T) => isEqual(item, realValue), [realValue]);

	return (
		<List
			{...props}
			getActiveItem={getActiveItem}
			onItemClick={handleItemClick}
		/>
	);
};
