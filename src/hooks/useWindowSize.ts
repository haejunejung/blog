"use client";

import { emptyObject } from "@/constants";
import { debounce } from "@/utils";
import { useSyncExternalStore } from "react";

interface UseWindowSizeProps {
	debounceTime?: number;
}

interface UseWindowSizeReturn {
	width: number;
	height: number;
}

export function useWindowSize({
	debounceTime = 300,
}: UseWindowSizeProps = emptyObject): UseWindowSizeReturn {
	const windowSize = useSyncExternalStore(
		(callback) => subscribe(callback, debounceTime),
		getSnapshot,
		getServerSnapshot,
	);

	return windowSize;
}

const initialWindowSize = {
	width: 0,
	height: 0,
};

let lastWindowSize = {
	width: 0,
	height: 0,
};

const getServerSnapshot = () => {
	return initialWindowSize;
};

const getSnapshot = () => {
	return lastWindowSize;
};

const subscribe = (callback: () => void, debouncetime: number) => {
	const handleResize = () => {
		const innerWidth = window.innerWidth;
		const innerHeight = window.innerHeight;

		if (
			lastWindowSize.width !== innerWidth ||
			lastWindowSize.height !== innerHeight
		) {
			lastWindowSize = { width: innerWidth, height: innerHeight };
			callback();
		}
	};

	const debouncedResize = debounce(handleResize, debouncetime);

	window.addEventListener("resize", debouncedResize);
	return () => {
		window.removeEventListener("resize", debouncedResize);
	};
};
