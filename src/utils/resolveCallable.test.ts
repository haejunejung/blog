import { describe, expect, expectTypeOf, it } from "vitest";
import { resolveCallable } from "./resolveCallable";

describe("resolveCallable", () => {
	it("should return the value if it's not a function", () => {
		const value = 42;
		const result = resolveCallable(value);
		expectTypeOf(result).toBeNumber();
		expect(result).toBe(value);
	});

	it("should return the result of the function if it's a function", () => {
		const fn = () => 42;
		const result = resolveCallable(fn);
		expectTypeOf(result).toBeNumber();
		expect(result).toBe(42);
	});

	it("should return the result of the function with arguments if it's a function", () => {
		const fn = (a: number, b: number) => a + b;
		const result = resolveCallable(fn, 2, 3);
		expectTypeOf(result).toBeNumber();
		expect(result).toBe(5);
	});

	it("should return the value if it's not a function with arguments", () => {
		const value = 42;
		const result = resolveCallable(value, 2, 3);
		expectTypeOf(result).toBeNumber();
		expect(result).toBe(value);
	});

	it("should return the result of the function with mixed arguments", () => {
		const fn = (a: number, b: string) => a + Number(b);
		const result = resolveCallable(fn, 2, "3");
		expectTypeOf(result).toBeNumber();
		expect(result).toBe(5);
	});
});
