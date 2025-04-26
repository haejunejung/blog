import type { ResolveCallable } from "@/types";
import { type DependencyList, useEffect } from "react";

export const useAsyncEffect = (
	effect: (signal: AbortSignal) => Promise<ResolveCallable<void>>,
	deps?: DependencyList,
	reason?: any,
) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: deps
	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		let cleanup: ResolveCallable<void>;

		effect(signal).then((result) => {
			if (!signal.aborted) {
				cleanup = result;
			}
		});

		return () => {
			abortController.abort(reason);
			cleanup?.();
		};
	}, [deps, effect]);
};
