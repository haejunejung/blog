import { emptyObject } from "@/consts";
import { describe, expect, expectTypeOf, it } from "vitest";
import { asyncNoop } from "./asyncNoop";

describe("asyncNoop", () => {
	it("should be a function", () => {
		// biome-ignore lint/complexity/noBannedTypes: bypass test
		expectTypeOf(asyncNoop).toEqualTypeOf<() => Promise<{}>>();
	});

	it("should return an empty object", async () => {
		expect(await asyncNoop()).toEqual(emptyObject);
	});
});
