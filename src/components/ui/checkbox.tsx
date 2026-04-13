"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps
	extends Omit<ComponentPropsWithoutRef<"button">, "onChange"> {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
	({ checked = false, onChange, disabled, className, ...props }, ref) => {
		const handleClick = () => {
			if (!disabled && onChange) {
				onChange(!checked);
			}
		};

		return (
			<button
				ref={ref}
				type="button"
				role="checkbox"
				aria-checked={checked}
				disabled={disabled}
				onClick={handleClick}
				className={cn(
					"flex justify-center items-center border-[1.5px] rounded-[4px] size-[18px] transition-colors shrink-0",
					checked
						? "bg-brand-primary border-brand-primary"
						: "bg-transparent border-overlay-bold",
					disabled
						? "opacity-50 cursor-not-allowed"
						: "cursor-pointer",
					className
				)}
				{...props}
			>
				<Check
					className={cn(
						"size-3 text-white",
						!checked && "opacity-0"
					)}
					strokeWidth={3}
				/>
			</button>
		);
	}
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
