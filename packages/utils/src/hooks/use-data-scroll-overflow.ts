import { useEffect, useRef } from 'react';
import capitalize from 'lodash.capitalize';

export type ScrollOverflowVisibility = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'both' | 'none';

export type ScrollOverflowEdgeCheck = 'all' | 'top' | 'bottom' | 'left' | 'right';

export type ScrollOverflowOrientation = 'horizontal' | 'vertical';
export type ScrollOverflowCheck = ScrollOverflowOrientation | 'both';

export interface UseDataScrollOverflowProps {
	/**
	 * The reference to the DOM element on which we're checking overflow.
	 */
	domRef?: React.RefObject<HTMLElement>;
	/**
	 * Determines the direction of overflow to check.
	 * - "horizontal" will check for overflow on the x-axis.
	 * - "vertical" will check for overflow on the y-axis.
	 * - "both" (default) will check for overflow on both axes.
	 *
	 * @default "both"
	 */
	shadowOverflowCheck?: ScrollOverflowCheck;
	/**
	 * Controlled visible state. Passing "auto" will make the shadow visible only when the scroll reaches the edge.
	 * use "left" / "right" for horizontal scroll and "top" / "bottom" for vertical scroll.
	 * @default "auto"
	 */
	shadowVisibility?: ScrollOverflowVisibility;
	/**
	 * Enables or disables the overflow checking mechanism.
	 * @default true
	 */
	shadowEnabled?: boolean;
	/**
	 * Defines a buffer or margin within which we won't treat the scroll as reaching the edge.
	 *
	 * @default 0 - meaning the check will behave exactly at the edge.
	 */
	shadowOffset?: number;
	/**
	 * List of dependencies to update the overflow check.
	 */
	updateDeps?: unknown[];
	/**
	 * Callback to be called when the overflow state changes.
	 *
	 * @param shadowVisibility ScrollOverflowVisibility
	 */
	onVisibilityChange?: (overflow: ScrollOverflowVisibility) => void;
}

export function useDataScrollOverflow(props: UseDataScrollOverflowProps = {}) {
	const {
		domRef,
		shadowEnabled = true,
		shadowOverflowCheck = 'vertical',
		shadowVisibility = 'auto',
		shadowOffset = 0,
		onVisibilityChange,
		updateDeps = [],
	} = props;

	const visibleRef = useRef<ScrollOverflowVisibility>(shadowVisibility);

	useEffect(() => {
		const el = domRef?.current;

		if (!el || !shadowEnabled) return;

		const setAttributes = (
			direction: string,
			hasBefore: boolean,
			hasAfter: boolean,
			prefix: string,
			suffix: string
		) => {
			if (shadowVisibility === 'auto') {
				const both = `${prefix}${capitalize(suffix)}Scroll`;

				if (hasBefore && hasAfter) {
					el.dataset[both] = 'true';
					el.removeAttribute(`data-${prefix}-scroll`);
					el.removeAttribute(`data-${suffix}-scroll`);
				} else {
					el.dataset[`${prefix}Scroll`] = hasBefore.toString();
					el.dataset[`${suffix}Scroll`] = hasAfter.toString();
					el.removeAttribute(`data-${prefix}-${suffix}-scroll`);
				}
			} else {
				const next = hasBefore && hasAfter ? 'both' : hasBefore ? prefix : hasAfter ? suffix : 'none';

				if (next !== visibleRef.current) {
					onVisibilityChange?.(next as ScrollOverflowVisibility);
					visibleRef.current = next as ScrollOverflowVisibility;
				}
			}
		};

		const checkOverflow = () => {
			const directions = [
				{ type: 'vertical', prefix: 'top', suffix: 'bottom' },
				{ type: 'horizontal', prefix: 'left', suffix: 'right' },
			];

			for (const { type, prefix, suffix } of directions) {
				if (shadowOverflowCheck === type || shadowOverflowCheck === 'both') {
					const hasBefore = type === 'vertical' ? el.scrollTop > shadowOffset : el.scrollLeft > shadowOffset;
					const hasAfter =
						type === 'vertical'
							? el.scrollTop + el.clientHeight + shadowOffset < el.scrollHeight
							: el.scrollLeft + el.clientWidth + shadowOffset < el.scrollWidth;

					setAttributes(type, hasBefore, hasAfter, prefix, suffix);
				}
			}
		};

		const clearOverflow = () => {
			['top', 'bottom', 'top-bottom', 'left', 'right', 'left-right'].forEach(attr => {
				el.removeAttribute(`data-${attr}-scroll`);
			});
		};

		// auto
		checkOverflow();
		el.addEventListener('scroll', checkOverflow);

		// controlled
		if (shadowVisibility !== 'auto') {
			clearOverflow();

			if (shadowVisibility === 'both') {
				el.dataset.topBottomScroll = String(shadowOverflowCheck === 'vertical');
				el.dataset.leftRightScroll = String(shadowOverflowCheck === 'horizontal');
			} else {
				el.dataset.topBottomScroll = 'false';
				el.dataset.leftRightScroll = 'false';

				['top', 'bottom', 'left', 'right'].forEach(attr => {
					el.dataset[`${attr}Scroll`] = String(shadowVisibility === attr);
				});
			}
		}

		return () => {
			el.removeEventListener('scroll', checkOverflow);
			clearOverflow();
		};
	}, [...updateDeps, shadowEnabled, shadowVisibility, shadowOverflowCheck, onVisibilityChange, domRef]);
}

export type UseDataScrollOverflowReturn = ReturnType<typeof useDataScrollOverflow>;
