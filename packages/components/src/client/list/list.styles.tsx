import { tv, type VariantProps } from 'tailwind-variants';

export const list = tv({
	slots: {
		root: 'w-fit rounded',
		item: 'px-2 py-1 text-base',
		sectionHeader: 'bg-background-3 text-foreground-2 sticky top-0 z-10 border-y p-1 text-xs',
	},
	variants: {
		bordered: {
			true: {
				root: 'border',
				item: 'border-b last:border-b-0',
			},
		},
	},
	defaultVariants: {
		bordered: true,
	},
});

export type ListVariantProps = VariantProps<typeof list>;
export type ListSlots = keyof ReturnType<typeof list>;
