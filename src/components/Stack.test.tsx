import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
	it("renders as a div by default", () => {
		const { container } = render(<Stack>Content</Stack>);
		expect(container.firstChild?.nodeName).toBe("DIV");
		expect(container.firstChild).toHaveClass("flex", "flex-row");
	});

	it("renders children", () => {
		const { getByText } = render(<Stack>Test Child</Stack>);
		expect(getByText("Test Child")).toBeInTheDocument();
	});

	it("applies vertical direction correctly", () => {
		const { container } = render(<Stack direction="vertical" />);
		expect(container.firstChild).toHaveClass("flex", "flex-col");
		expect(container.firstChild).not.toHaveClass("flex-row");
	});

	it("merges custom className", () => {
		const { container } = render(<Stack className="bg-red-500" />);
		expect(container.firstChild).toHaveClass("flex", "flex-row", "bg-red-500");
	});

	it("respects the 'as' prop", () => {
		const { container } = render(<Stack as="section" />);
		expect(container.firstChild?.nodeName).toBe("SECTION");
	});
});
