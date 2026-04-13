import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps {
	label: string;
	children: React.ReactNode;
	className?: string;
	contentClassName?: string;
	hint?: React.ReactNode;
}

export function Field({
	label,
	children,
	className,
	hint,
	contentClassName,
}: FieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<p className="font-medium text-secondary-text text-sm">{label}</p>
			<div className={cn(contentClassName)}>{children}</div>
			{hint != null && (
				<p className="text-[13px] text-tertiary-text">{hint}</p>
			)}
		</div>
	);
}
