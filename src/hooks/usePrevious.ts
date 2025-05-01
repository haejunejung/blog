import { useRef } from "react";

export function usePrevious<T>(
	state: T,
	equalFn: (prev: T, next: T) => boolean = Object.is,
) {
	const previousRef = useRef<T>(state);
	const currentRef = useRef<T>(state);
	const isFirstRender = useRef(true);

	if (isFirstRender.current) {
		isFirstRender.current = false;
		return previousRef.current;
	}

	if (!equalFn(currentRef.current, state)) {
		previousRef.current = currentRef.current;
		currentRef.current = state;
	}

	return previousRef.current;
}
