import { isFunction } from "./isFunction";

export function resolveCallable<Arguments extends unknown[], Return>(
	callable: (...args: Arguments) => Return,
	...args: Arguments
): Return;

export function resolveCallable<Return>(
	callable: Return,
	...args: unknown[]
): Return;

export function resolveCallable(callable: any, ...args: any[]): any {
	return isFunction(callable) ? callable(...args) : callable;
}
