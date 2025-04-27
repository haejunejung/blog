import { emptyArray } from "@/consts";
import { arrayify } from "@/utils";
import { useCallback, useState } from "react";

type UseStackStateReturn<T> = {
	stack: T[];
	push: (item: T) => void;
	pop: () => T | undefined;
	peek: () => T | undefined;
	clear: VoidFunction;
	length: number;
};

// TODO: useRef + ForceUpdate가 아닌 useSyncExternalState를 사용하여 O(N) -> O(1) with Class
export const useStackState = <T = unknown>(
	initialState: T[] = emptyArray,
): UseStackStateReturn<T> => {
	const [stack, setStack] = useState<T[]>(arrayify(initialState));

	const push = useCallback((item: T) => {
		setStack((prev) => [...prev, item]);
	}, []);

	const pop = useCallback(() => {
		const lastItem = stack.at(-1);
		setStack((prev) => prev.slice(0, -1));
		return lastItem;
	}, [stack]);

	const peek = useCallback(() => {
		return stack.at(-1);
	}, [stack]);

	const clear = useCallback(() => {
		setStack(emptyArray);
	}, []);

	const length = stack.length;

	return { stack, push, pop, peek, clear, length } as const;
};
