import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExternalLink } from "./ExternalLink";

describe("ExternalLink", () => {
	it("should include the `_blank` target and `noopener noreferrer` rel attricutes", () => {
		const { container, getByText } = render(
			<ExternalLink href="https://example.com">External Link</ExternalLink>,
		);

		expect(container.querySelector("a")).toHaveAttribute(
			"href",
			"https://example.com",
		);
		expect(container.querySelector("a")).toHaveAttribute("target", "_blank");
		expect(container.querySelector("a")).toHaveAttribute(
			"rel",
			"noopener noreferrer",
		);
		expect(getByText("External Link")).toBeInTheDocument();
	});
});
