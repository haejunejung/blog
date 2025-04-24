import type {
	HasDisplayName,
	PolymorphicComponentProps,
	PolymorphicRef,
} from "@/types";
import { forwardRefWithAs } from "@/utils";
import clsx from "clsx";
import type { ElementType } from "react";

type FlexProps<TTag extends ElementType> = PolymorphicComponentProps<
	TTag,
	{
		direction?: "horizontal" | "vertical";
	}
>;

type FlexRef<TTag extends ElementType> = PolymorphicRef<TTag>;

function FlexFn<TTag extends ElementType = "div">(
	props: FlexProps<TTag>,
	ref: FlexRef<TTag>,
) {
	const {
		as,
		direction = "horizontal",
		className,
		children,
		...restProps
	} = props;
	const Component = as || "div";
	return (
		<Component
			ref={ref}
			className={clsx(
				"flex",
				{
					"flex-row": direction === "horizontal",
					"flex-col": direction === "vertical",
				},
				className,
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

FlexFn.displayName = "Flex";

export interface _internal_ComponentFlex extends HasDisplayName {
	<TTag extends ElementType = "div">(
		props: FlexProps<TTag> & { ref?: FlexRef<TTag> },
	): ReturnType<typeof FlexFn>;
}

export const Flex = forwardRefWithAs(FlexFn) as _internal_ComponentFlex;
