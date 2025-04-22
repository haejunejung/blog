import type { MutableRefObject } from "react";

export function createMutatableRef<T>(initialValue: T): MutableRefObject<T> {
	return { current: initialValue };
}
