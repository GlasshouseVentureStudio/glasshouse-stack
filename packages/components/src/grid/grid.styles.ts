import { tv, type VariantProps } from 'tailwind-variants';

export const gridSystem = tv({
	slots: {
		root: 'gvs-relative gvs-grid gvs-h-[var(--height)] gvs-w-[var(--width)] gvs-grid-cols-[repeat(var(--grid-columns),_var(--column-width))] gvs-grid-rows-[repeat(var(--grid-rows),_var(--row-height))] gvs-border',
	},
	variants: {
		rootBorder: {
			true: {
				root: 'gvs-border',
			},
		},
	},
});

export type GridVariantProps = VariantProps<typeof gridSystem>;
export type GridSlots = keyof ReturnType<typeof gridSystem>;
