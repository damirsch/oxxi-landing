import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
	error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex px-3 py-2 border rounded-lg w-full min-h-[90px] bg-overlay-subtle text-primary-text text-sm transition-colors resize-none",
					"placeholder:text-tertiary-text placeholder:opacity-60",
					"focus-visible:outline-none focus-visible:ring-0",
					"disabled:cursor-not-allowed disabled:opacity-50",
					error
						? "border-danger-primary bg-danger-primary/5 placeholder:text-danger-primary/70 focus-visible:border-danger-primary"
						: "border-overlay-soft focus-within:border-overlay-bold",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
