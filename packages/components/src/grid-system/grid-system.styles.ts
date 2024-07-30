import { tv, type VariantProps } from 'tailwind-variants';

export const gridSystem = tv({
	slots: {
		root: 'relative grid h-[var(--height)] w-[var(--width)] grid-cols-[repeat(var(--grid-columns),_var(--column-width))] grid-rows-[repeat(var(--grid-rows),_var(--row-height))] border',
	},
	variants: {
		rootBorder: {
			true: {
				root: 'border',
			},
		},
	},
});

export type GridSystemVariantProps = VariantProps<typeof gridSystem>;
export type GridSystemSlots = keyof ReturnType<typeof gridSystem>;
