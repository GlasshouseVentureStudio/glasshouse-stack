import { tv, type VariantProps } from 'tailwind-variants';

export const dataList = tv({
	slots: {
		base: 'relative h-full w-full',
		list: 'h-full',
		listItem:
			'text-foreground hover:bg-primary data-active:bg-primary data-active:text-white line-clamp-1 py-1 pl-4 pr-4 text-xs leading-normal transition-colors hover:text-white hover:no-underline',
		sectionHeader: 'bg-background-3 text-foreground-2 sticky top-0 z-10 border-y p-1 text-xs',
	},
});

export type DataListVariantProps = VariantProps<typeof dataList>;
export type DataListSlots = keyof ReturnType<typeof dataList>;
