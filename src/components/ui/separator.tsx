import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const Separator = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"bg-primary-border w-full h-px min-h-px shrink-0",
				className
			)}
			{...props}
		/>
	)
);

Separator.displayName = "Separator";

export { Separator };
