"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

const buttonVariants = cva(
	"inline-flex justify-center items-center gap-2 disabled:opacity-50 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary h-9 text-sm whitespace-nowrap transition-colors cursor-pointer [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary-text  text-primary-background hover:text-primary-background shadow-sm active:bg-primary-text/80 font-semibold hover:bg-primary-text/90",
				secondary: "border border-overlay-bold bg-transparent text-primary-text hover:bg-overlay-subtle",
				accent: "bg-brand-primary text-white shadow-sm hover:bg-brand-primary/90 active:bg-brand-primary/85",
				"accent-light":
					"bg-brand-light text-brand-primary hover:text-brand-primary active:bg-brand-primary/25 hover:bg-brand-primary/20",
				destructive: "bg-danger-primary text-white shadow-sm hover:bg-danger-primary/90 active:bg-danger-primary",
				ghost: "bg-transparent text-primary-text hover:bg-overlay-subtle",
				link: "text-brand-primary hover:underline hover:text-brand-primary p-0 leading-none h-fit rounded-none px-0 active:bg-transparent whitespace-normal",
			},
			size: {
				default: "",
				sm: "h-8 text-xs",
				lg: "h-10 px-4",
				icon: "size-9",
				"icon-sm": "size-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
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

export { Button, buttonVariants }
