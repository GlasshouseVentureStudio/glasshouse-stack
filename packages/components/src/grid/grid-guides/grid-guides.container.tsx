import { areClipSpansEqual } from '../grid.utils';
import { GridGuides } from './grid-guides';
import { type GridGuidesContainerProps } from './grid-guides.types';

/**
 * Renders a grid with guides based on the provided rows and columns configuration.
 *
 * @component
 * @param {GridGuidesProps} props - The props for the GridGuidesContainer component.
 * @returns {JSX.Element} The rendered GridGuidesContainer component.
 */
export const GridGuidesContainer = ({ rows, columns, hideGuides, responsiveClipSpans }: GridGuidesContainerProps) => {
	const areRowsEqual =
		typeof rows.base === rows.xs &&
		rows.xs === rows.sm &&
		rows.sm === rows.md &&
		rows.md === rows.lg &&
		rows.xl === rows.lg;

	const areColumnsEqual =
		columns.base === columns.xs &&
		columns.xs === columns.sm &&
		columns.sm === columns.md &&
		columns.md === columns.lg &&
		columns.xl === columns.lg;

	const areClipSpansEqualAcrossBreakpoints =
		areClipSpansEqual(responsiveClipSpans.base, responsiveClipSpans.xs) &&
		areClipSpansEqual(responsiveClipSpans.xs, responsiveClipSpans.sm) &&
		areClipSpansEqual(responsiveClipSpans.sm, responsiveClipSpans.md) &&
		areClipSpansEqual(responsiveClipSpans.md, responsiveClipSpans.lg) &&
		areClipSpansEqual(responsiveClipSpans.lg, responsiveClipSpans.xl);

	if (areRowsEqual && areColumnsEqual && areClipSpansEqualAcrossBreakpoints) {
		return (
			<GridGuides
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hideGuides={hideGuides}
				rows={rows.xs as number}
			/>
		);
	}

	return (
		<>
			<GridGuides
				clipSpans={responsiveClipSpans.base}
				columns={columns.base as number}
				hiddenFrom='xs'
				hideGuides={hideGuides}
				rows={rows.base as number}
			/>
			<GridGuides
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hiddenFrom='sm'
				hideGuides={hideGuides}
				rows={rows.xs as number}
				visibleFrom='xs'
			/>
			<GridGuides
				clipSpans={responsiveClipSpans.sm}
				columns={columns.sm as number}
				hiddenFrom='md'
				hideGuides={hideGuides}
				rows={rows.sm as number}
				visibleFrom='sm'
			/>
			<GridGuides
				clipSpans={responsiveClipSpans.md}
				columns={columns.md as number}
				hiddenFrom='lg'
				hideGuides={hideGuides}
				rows={rows.md as number}
				visibleFrom='md'
			/>
			<GridGuides
				clipSpans={responsiveClipSpans.lg}
				columns={columns.lg as number}
				hiddenFrom='xl'
				hideGuides={hideGuides}
				rows={rows.lg as number}
				visibleFrom='lg'
			/>
			<GridGuides
				clipSpans={responsiveClipSpans.xl}
				columns={columns.xl as number}
				hideGuides={hideGuides}
				rows={rows.xl as number}
				visibleFrom='xl'
			/>
		</>
	);
};
