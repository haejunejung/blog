import type {
	HasDisplayName,
	PolymorphicComponentProps,
	PolymorphicRef,
} from "@/types";
import { forwardRefWithAs } from "@/utils";
import clsx from "clsx";
import type { ElementType } from "react";

type StackProps<TTag extends ElementType> = PolymorphicComponentProps<
	TTag,
	{
		direction?: "horizontal" | "vertical";
	}
>;

type StackRef<TTag extends ElementType> = PolymorphicRef<TTag>;

function StackFn<TTag extends ElementType = "div">(
	props: StackProps<TTag>,
	ref: StackRef<TTag>,
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

StackFn.displayName = "Stack";

export interface _internal_ComponentStack extends HasDisplayName {
	<TTag extends ElementType = "div">(
		props: StackProps<TTag> & { ref?: StackRef<TTag> },
	): ReturnType<typeof StackFn>;
}

export const Stack = forwardRefWithAs(StackFn) as _internal_ComponentStack;
