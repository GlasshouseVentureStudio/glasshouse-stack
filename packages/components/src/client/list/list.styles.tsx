import { tv, type VariantProps } from 'tailwind-variants';

export const list = tv({
	slots: {
		root: 'relative rounded',
		list: 'relative rounded',
		item: 'left-0 top-0',
		sectionHeader: 'bg-background-3 text-foreground-2 sticky top-0 z-10 border-y p-1 text-xs',
		header: '',
		footer: '',
	},
	variants: {
		bordered: {
			true: {
				root: 'border',
			},
		},
		orientation: {
			horizontal: {
				root: 'h-full',
				item: 'h-full translate-x-[var(--translate)]',
				list: 'h-full w-[var(--list-size)]',
			},
			vertical: {
				root: 'w-full',
				item: 'w-full translate-y-[var(--translate)]',
				list: 'h-[var(--list-size)]',
			},
		},
		stickyHeader: {
			true: '',
		},
		stickyFooter: {
			true: '',
		},
	},
	defaultVariants: {
		bordered: true,
		orientation: 'vertical',
		stickyHeader: false,
		stickyFooter: false,
	},
	compoundVariants: [
		{
			bordered: true,
			orientation: 'horizontal',
			class: {
				item: 'border-r last:border-r-0',
			},
		},
		{
			bordered: true,
			orientation: 'vertical',
			class: {
				item: 'border-b last:border-b-0',
			},
		},
		{
			stickyHeader: true,
			class: {
				header: 'sticky top-0 z-10',
			},
		},
		{
			stickyFooter: true,
			class: {
				footer: 'sticky bottom-0 z-10',
			},
		},
	],
});

export type ListVariantProps = VariantProps<typeof list>;
export type ListSlots = keyof ReturnType<typeof list>;
