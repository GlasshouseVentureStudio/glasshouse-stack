import { type ComboboxData, type ComboboxItem, type ComboboxParsedItemGroup } from '@mantine/core';

export function isOptionsGroupList(data: ComboboxData): data is ComboboxParsedItemGroup[] {
	return data.length > 0 && typeof data[0] === 'object' && 'group' in data[0];
}

export function isLabelValueList(data: ComboboxData): data is ComboboxItem[] {
	return data.length > 0 && typeof data[0] === 'object' && 'label' in data[0];
}
