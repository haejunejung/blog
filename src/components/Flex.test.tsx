import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Flex } from "./Flex";

describe("Flex", () => {
	it("renders as a div by default", () => {
		const { container } = render(<Flex>Content</Flex>);
		expect(container.firstChild?.nodeName).toBe("DIV");
		expect(container.firstChild).toHaveClass("flex", "flex-row");
	});

	it("renders children", () => {
		const { getByText } = render(<Flex>Test Child</Flex>);
		expect(getByText("Test Child")).toBeInTheDocument();
	});

	it("applies vertical direction correctly", () => {
		const { container } = render(<Flex direction="vertical" />);
		expect(container.firstChild).toHaveClass("flex", "flex-col");
		expect(container.firstChild).not.toHaveClass("flex-row");
	});

	it("merges custom className", () => {
		const { container } = render(<Flex className="bg-red-500" />);
		expect(container.firstChild).toHaveClass("flex", "flex-row", "bg-red-500");
	});

	it("respects the 'as' prop", () => {
		const { container } = render(<Flex as="section" />);
		expect(container.firstChild?.nodeName).toBe("SECTION");
	});
});
