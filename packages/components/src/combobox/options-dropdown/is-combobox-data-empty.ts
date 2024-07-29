import { type ComboboxParsedItem } from '@mantine/core';

export const isComboboxDataEmpty = (data: ComboboxParsedItem[]) => {
	if (data.length === 0) {
		return true;
	}

	for (const item of data) {
		if (!('group' in item)) {
			return false;
		}

		if (item.items.length > 0) {
			return false;
		}
	}

	return true;
};
