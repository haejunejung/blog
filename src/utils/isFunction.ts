import type { AnyFunction } from "@/types";

export const isFunction = (value: unknown): value is AnyFunction => {
	return typeof value === "function";
};
