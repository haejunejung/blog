import type {
	HasDisplayName,
	PolymorphicComponentProps,
	PolymorphicRef,
} from "@/types";
import { forwardRefWithAs } from "@/utils";
import { cn } from "@/utils/cn";
import type { ElementType } from "react";

type CardProps<TTag extends ElementType> = PolymorphicComponentProps<TTag>;
type CardRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardFn<TTag extends ElementType = "div">(
	props: CardProps<TTag>,
	ref: CardRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
				className,
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardHeaderProps<TTag extends ElementType> =
	PolymorphicComponentProps<TTag>;
type CardHeaderRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardHeaderFn<TTag extends ElementType = "div">(
	props: CardHeaderProps<TTag>,
	ref: CardHeaderRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardTitleProps<TTag extends ElementType> = PolymorphicComponentProps<TTag>;
type CardTitleRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardTitleFn<TTag extends ElementType = "div">(
	props: CardTitleProps<TTag>,
	ref: CardTitleRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardDescriptionProps<TTag extends ElementType> =
	PolymorphicComponentProps<TTag>;
type CardDescriptionRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardDescriptionFn<TTag extends ElementType = "div">(
	props: CardDescriptionProps<TTag>,
	ref: CardDescriptionRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardActionProps<TTag extends ElementType> =
	PolymorphicComponentProps<TTag>;
type CardActionRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardActionFn<TTag extends ElementType = "div">(
	props: CardActionProps<TTag>,
	ref: CardActionRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardContentProps<TTag extends ElementType> =
	PolymorphicComponentProps<TTag>;
type CardContentRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardContentFn<TTag extends ElementType = "div">(
	props: CardContentProps<TTag>,
	ref: CardContentRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-content"
			className={cn("px-6", className)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

type CardFooterProps<TTag extends ElementType> =
	PolymorphicComponentProps<TTag>;
type CardFooterRef<TTag extends ElementType> = PolymorphicRef<TTag>;
function CardFooterFn<TTag extends ElementType = "div">(
	props: CardFooterProps<TTag>,
	ref: CardFooterRef<TTag>,
) {
	const { as, className, children, ...restProps } = props;
	const Component = as || "div";

	return (
		<Component
			ref={ref}
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...restProps}
		>
			{children}
		</Component>
	);
}

CardFn.displayName = "Card";
CardHeaderFn.displayName = "CardHeader";
CardTitleFn.displayName = "CardTitle";
CardDescriptionFn.displayName = "CardDescription";
CardActionFn.displayName = "CardAction";
CardContentFn.displayName = "CardContent";
CardFooterFn.displayName = "CardFooter";

export interface _internal_ComponentCard extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardProps<TTag> & { ref?: CardRef<TTag> },
	): ReturnType<typeof CardFn>;
}

export interface _internal_ComponentCardHeader extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardHeaderProps<TTag> & { ref?: CardHeaderRef<TTag> },
	): ReturnType<typeof CardHeaderFn>;
}

export interface _internal_ComponentCardTitle extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardTitleProps<TTag> & { ref?: CardTitleRef<TTag> },
	): ReturnType<typeof CardTitleFn>;
}

export interface _internal_ComponentCardDescription extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardDescriptionProps<TTag> & { ref?: CardDescriptionRef<TTag> },
	): ReturnType<typeof CardDescriptionFn>;
}

export interface _internal_ComponentCardAction extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardActionProps<TTag> & { ref?: CardActionRef<TTag> },
	): ReturnType<typeof CardActionFn>;
}

export interface _internal_ComponentCardContent extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardContentProps<TTag> & { ref?: CardContentRef<TTag> },
	): ReturnType<typeof CardContentFn>;
}

export interface _internal_ComponentCardFooter extends HasDisplayName {
	<TTag extends ElementType>(
		props: CardFooterProps<TTag> & { ref?: CardFooterRef<TTag> },
	): ReturnType<typeof CardFooterFn>;
}

export const Card = forwardRefWithAs(CardFn) as _internal_ComponentCard;
export const CardHeader = forwardRefWithAs(
	CardHeaderFn,
) as _internal_ComponentCardHeader;
export const CardTitle = forwardRefWithAs(
	CardTitleFn,
) as _internal_ComponentCardTitle;
export const CardDescription = forwardRefWithAs(
	CardDescriptionFn,
) as _internal_ComponentCardDescription;
export const CardAction = forwardRefWithAs(
	CardActionFn,
) as _internal_ComponentCardAction;
export const CardContent = forwardRefWithAs(
	CardContentFn,
) as _internal_ComponentCardContent;
export const CardFooter = forwardRefWithAs(
	CardFooterFn,
) as _internal_ComponentCardFooter;
