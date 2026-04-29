"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { buttonVariants, type ButtonVariants } from "@/components/ui/button-variants"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
	asChild?: boolean
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
		const isLightVariant = ["accent", "destructive", "secondary"].includes(variant || "default")
		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && (
					<Spinner
						size='sm'
						className={
							variant === "default"
								? "border-primary-background/30 border-t-primary-background"
								: isLightVariant
								? "border-white/30 border-t-white"
								: undefined
						}
					/>
				)}
				{asChild ? children : <>{children}</>}
			</Comp>
		)
	}
)
Button.displayName = "Button"

export { Button }
export { buttonVariants } from "@/components/ui/button-variants"
