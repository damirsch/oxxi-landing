import { cn } from "@/lib/utils";

interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: "size-4",
	md: "size-5",
	lg: "size-8 border-3",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
	return (
		<div
			className={cn(
				"border-2 border-secondary-border border-t-brand-primary rounded-full animate-spin",
				sizeClasses[size],
				className
			)}
		/>
	);
}
