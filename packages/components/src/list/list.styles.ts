import { tv, type VariantProps } from 'tailwind-variants';

export const list = tv({
	slots: {
		root: '',
		scrollArea: 'gvs-relative gvs-rounded',
		list: 'gvs-relative gvs-rounded',
		item: 'gvs-left-0 gvs-top-0',
		groupHeader: 'gvs-sticky gvs-top-0 gvs-z-[1] gvs-border-y gvs-p-1 gvs-text-xs',
		header: '',
		footer: '',
		loader: 'gvs-absolute gvs-inset-0 gvs-z-[1]',
		empty: 'gvs-flex gvs-h-full gvs-min-h-20 gvs-w-full gvs-min-w-20 gvs-items-center gvs-justify-center',
		pagination: '',
		bottomLoaderWrapper: 'gvs-flex gvs-w-full gvs-items-center gvs-justify-center gvs-p-10',
	},
	variants: {
		bordered: {
			true: {
				scrollArea: 'gvs-border',
			},
		},
		orientation: {
			horizontal: {
				scrollArea: 'gvs-h-full',
				item: 'gvs-h-full gvs-translate-x-[var(--translate)]',
				list: 'gvs-h-full gvs-w-[var(--list-size)]',
			},
			vertical: {
				scrollArea: 'gvs-w-full',
				item: 'gvs-w-full gvs-translate-y-[var(--translate)]',
				list: 'gvs-h-[var(--list-size)]',
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
				item: 'gvs-border-r gvs-last:border-r-0',
			},
		},
		{
			bordered: true,
			orientation: 'vertical',
			class: {
				item: 'gvs-border-b gvs-last:border-b-0',
			},
		},
		{
			stickyHeader: true,
			class: {
				header: 'gvs-sticky gvs-top-0 gvs-z-10',
			},
		},
		{
			stickyFooter: true,
			class: {
				footer: 'gvs-sticky gvs-bottom-0 gvs-z-10',
			},
		},
	],
});

export type ListVariantProps = VariantProps<typeof list>;
export type ListSlots = keyof ReturnType<typeof list>;
