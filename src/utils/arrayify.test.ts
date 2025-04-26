import { describe, expect, expectTypeOf, it } from "vitest";
import { arrayify } from "./arrayify";

describe("arrayify", () => {
	it("should convert a string to an array", () => {
		const input = "hello";
		const expected = ["hello"];
		const result = arrayify(input);
		expect(result).toEqual(expected);
		expectTypeOf(result).toEqualTypeOf<string[]>();
	});

	it("should convert a number to an array", () => {
		const input = 42;
		const expected = [42];
		const result = arrayify(input);
		expect(result).toEqual(expected);
		expectTypeOf(result).toEqualTypeOf<number[]>();
	});

	it("should convert a boolean to an array", () => {
		const input = true;
		const expected = [true];
		const result = arrayify(input);
		expect(result).toEqual(expected);
		expectTypeOf(result).toEqualTypeOf<boolean[]>();
	});

	it("should convert a null to an array", () => {
		const input: null = null;
		const expected = [null];
		const result = arrayify(input);
		expect(result).toEqual(expected);
		expectTypeOf(result).toEqualTypeOf<null[]>();
	});

	it("should return an array when input is already an array", () => {
		const input = [1, 2, 3];
		const expected = [1, 2, 3];
		const result = arrayify(input);
		expect(result).toEqual(expected);
		expectTypeOf(result).toEqualTypeOf<number[]>();
	});
});
