import { Grid } from '@glasshouse/components';
import { Card } from '@mantine/core';

export const GridExample = () => {
	return (
		<Card>
			<Grid
				columns={1}
				rows={1}
			>
				<Grid.Cell>Cell</Grid.Cell>
			</Grid>
		</Card>
	);
};
