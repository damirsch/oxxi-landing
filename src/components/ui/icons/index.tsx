import { cn } from "@/lib/utils";
import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	children?: React.ReactNode;
	className?: string;
	strokeWidth?: number | string;
}

export const Icon: React.FC<IconProps> = ({
	children,
	className,
	strokeWidth = 1.5,
	style,
	...props
}) => {
	const merged = cn(
		"size-5 text-inherit transition-all duration-200",
		className
	);

	return (
		<svg
			className={merged}
			width={props.width || 20}
			height={props.height || 20}
			viewBox={props.viewBox || "0 0 20 20"}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={
				{
					...style,
					"--icon-stroke-width": strokeWidth,
				} as React.CSSProperties
			}
			{...props}
		>
			{children}
		</svg>
	);
};

export const IconArrowRight: React.FC<IconProps> = ({
	className,
	...props
}) => (
	<Icon viewBox="0 0 20 20" className={className} {...props}>
		<path
			d="M4.167 10h11.666M10.833 5l5 5-5 5"
			stroke="currentColor"
			strokeWidth="var(--icon-stroke-width, 1.5)"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Icon>
);
