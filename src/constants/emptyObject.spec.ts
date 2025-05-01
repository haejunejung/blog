import { describe, expect, expectTypeOf, it } from "vitest";
import { emptyObject } from "./emptyObject";

describe("emptyObject", () => {
	it("should be an empty object", () => {
		expect(emptyObject).toEqual({});
	});

	it("should be frozen", () => {
		expect(Object.isFrozen(emptyObject)).toBe(true);
	});

	it("should not be extensible", () => {
		expect(Object.isExtensible(emptyObject)).toBe(false);
	});

	it("should be an Record of string to unknown", () => {
		expectTypeOf(emptyObject).toEqualTypeOf<Record<string, unknown>>();
	});
});
