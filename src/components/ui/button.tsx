"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { buttonVariants, type ButtonVariants } from "@/components/ui/button-variants"

type ButtonBaseProps = ButtonVariants & {
	asChild?: boolean
	isLoading?: boolean
	className?: string
	children?: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	({ className, variant = "default", size, asChild = false, isLoading, children, href, ...props }, ref) => {
		const isLightVariant = ["accent", "destructive", "secondary"].includes(variant || "default")
		const classes = cn(buttonVariants({ variant, size, className }))

		const spinner = isLoading ? (
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
		) : null

		if (href) {
			return (
				<a
					className={classes}
					href={href}
					ref={ref as React.Ref<HTMLAnchorElement>}
					{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{spinner}
					{children}
				</a>
			)
		}

		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				className={classes}
				ref={ref as React.Ref<HTMLButtonElement>}
				disabled={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled || isLoading}
				{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
			>
				{spinner}
				{asChild ? children : <>{children}</>}
			</Comp>
		)
	}
)
Button.displayName = "Button"

export { Button }
export { buttonVariants } from "@/components/ui/button-variants"
