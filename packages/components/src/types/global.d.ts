/* eslint-disable @typescript-eslint/no-unnecessary-qualifier -- must have */
import 'react';

declare module 'react' {
	function forwardRef<T, P extends object>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}
