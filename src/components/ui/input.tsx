import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
	error?: boolean;
	rightElement?: React.ReactNode;
	wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			error,
			rightElement,
			wrapperClassName,
			"aria-invalid": ariaInvalid,
			...props
		},
		ref
	) => {
		const hasError =
			error || ariaInvalid === true || ariaInvalid === "true";
		const inputElement = (
			<input
				type={type}
				aria-invalid={ariaInvalid}
				className={cn(
					"flex bg-overlay-subtle px-3 py-1 border rounded-lg w-full h-9 text-primary-text text-sm transition-colors",
					"placeholder:text-tertiary-text placeholder:opacity-60",
					"focus-visible:outline-none focus-visible:border-overlay-bold focus-visible:ring-0",
					"disabled:cursor-not-allowed disabled:opacity-50",
					hasError
						? "border-danger-primary bg-danger-primary/5 placeholder:text-danger-primary focus-visible:border-danger-primary"
						: "border-overlay-soft focus-within:border-overlay-bold",
					rightElement && "pr-10",
					className
				)}
				ref={ref}
				{...props}
			/>
		);

		if (!rightElement) return inputElement;

		return (
			<div className={cn("relative w-full", wrapperClassName)}>
				{inputElement}
				<div className="top-1/2 right-3 absolute -translate-y-1/2">
					{rightElement}
				</div>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
