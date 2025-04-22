import { emptyObject } from "@/consts";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { expect, vi } from "vitest";
import { serverEnvironment } from "./serverEnvironment";

export async function renderSSR(
	renderer: () => ReactNode,
	options: RenderOptions = {},
) {
	const errorSpy = vi
		.spyOn(console, "error")
		.mockImplementation(() => emptyObject);
	const ui = renderer();
	const serverUi = renderer();

	const container = document.createElement("div");
	container.innerHTML = renderToString(serverUi);
	document.body.appendChild(container);

	const result = render(ui, {
		...options,
		container,
		hydrate: true,
		onRecoverableError: (error) => {
			if (
				error instanceof Error &&
				error.message.includes("Hydration failed")
			) {
				// biome-ignore lint/suspicious/noConsole: for debugging
				console.error("Hydration failed");
			}

			// biome-ignore lint/suspicious/noConsole: for debugging
			console.warn(error);
		},
	});

	await vi.waitFor(
		() => {
			// biome-ignore lint/suspicious/noMisplacedAssertion: only for testing
			expect(errorSpy).not.toHaveBeenCalledWith("Hydration failed");
		},
		{
			timeout: 1000,
		},
	);

	return result;
}

renderSSR.serverOnly = (renderer: () => ReactNode) => {
	const ui = renderer();
	const stringified = serverEnvironment(() => renderToString(ui));
	const renderResult = render(
		// biome-ignore lint/security/noDangerouslySetInnerHtml: only for testing
		<div dangerouslySetInnerHTML={{ __html: stringified }} />,
	);
	return renderResult;
};
