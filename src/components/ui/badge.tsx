import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"flex justify-center items-center gap-1.5 bg-surface-background border border-primary-border font-heading text-secondary-text text-sm tracking-[-0.01em] transition-colors",
	{
		variants: {
			size: {
				default: "px-2.5 h-7 rounded-full shadow-[0_2px_4px_0_rgba(0,0,0,0.04)]",
				small: "px-2 h-6 bg-primary-background rounded-[6px] shadow-[0_2px_6px_0_rgba(0,0,0,0.06)]",
			},
		},
		defaultVariants: { size: "default" },
	}
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
	icon?: React.ReactNode
	iconStrokeWidth?: number
}

function Badge({ className, size, icon, iconStrokeWidth, children, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ size }), className)} {...props}>
			{icon != null && (
				<span className='inline-flex [&_svg]:size-4 text-tertiary-text shrink-0 [&_svg]:shrink-0'>
					{iconStrokeWidth != null && React.isValidElement(icon)
						? React.cloneElement(icon as React.ReactElement<{ strokeWidth?: number }>, {
								strokeWidth: iconStrokeWidth,
						  })
						: icon}
				</span>
			)}
			{children}
		</div>
	)
}

export { Badge, badgeVariants }
