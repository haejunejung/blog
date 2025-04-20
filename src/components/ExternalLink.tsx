import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ExternalLinkProps = PropsWithChildren<ComponentPropsWithoutRef<"a">>;

export function ExternalLink({
	href,
	children,
	...restProps
}: ExternalLinkProps) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" {...restProps}>
			{children}
		</a>
	);
}
