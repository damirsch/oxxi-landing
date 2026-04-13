import { cn } from "@/lib/utils";

interface SectionWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
	return (
		<section
			className={cn(
				"mx-auto border-tertiary-border border-r border-l max-w-[1200px]",
				className
			)}
		>
			{children}
		</section>
	);
}

const fullWidthStyle = {
	left: "calc(-50vw + 50%)",
	right: "calc(-50vw + 50%)",
};

export function DividerLine({
	position = "top",
}: {
	position?: "top" | "bottom";
}) {
	const isTop = position === "top";

	return (
		<>
			<div
				className={cn(
					"absolute bg-tertiary-border h-px",
					isTop ? "top-0" : "bottom-0"
				)}
				style={fullWidthStyle}
			/>
			<div
				className={cn(
					"start-0 absolute bg-primary-background border-[1.5px] border-tertiary-border rounded-full size-[10px] -translate-x-1/2 rtl:translate-x-1/2",
					isTop
						? "top-0 -translate-y-1/2"
						: "bottom-0 translate-y-1/2"
				)}
			/>
			<div
				className={cn(
					"end-0 absolute bg-primary-background border-[1.5px] border-tertiary-border rounded-full size-[10px] translate-x-1/2 rtl:-translate-x-1/2",
					isTop
						? "top-0 -translate-y-1/2"
						: "bottom-0 translate-y-1/2"
				)}
			/>
		</>
	);
}
