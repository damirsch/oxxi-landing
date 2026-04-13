import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex justify-center items-center px-2 py-1 rounded-full h-5 font-medium transition-colors",
	{
		variants: {
			variant: {
				blue: "bg-brand-light text-brand-primary",
				gray: "bg-overlay-soft text-secondary-text",
				outline:
					"border border-brand-primary text-brand-primary bg-transparent",
				success: "bg-success-primary/20 text-success-primary",
			},
			size: {
				default: "text-xs tracking-[-0.12px]",
				lg: "py-1.5 h-8 text-[15px]",
			},
		},
		defaultVariants: {
			variant: "blue",
			size: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, size }), "gap-1", className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
