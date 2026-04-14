import { cn } from "@/lib/utils"

interface SectionWrapperProps {
	children: React.ReactNode
	className?: string
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
	return (
		<section className={cn("mx-auto pt-20 border-tertiary-border border-r border-l w-full max-w-[1200px]", className)}>
			{children}
		</section>
	)
}

const fullWidthStyle = {
	left: "calc(-50vw + 50%)",
	right: "calc(-50vw + 50%)",
}

const HATCH_SPACING = 12
const HATCH_COLOR = "hsl(220 11% 93%)"

export function HatchedPattern({ className, style }: { className?: string; style?: React.CSSProperties }) {
	return (
		<svg
			className={cn("z-[-1] absolute inset-0 w-full h-full pointer-events-none", className)}
			preserveAspectRatio='none'
			style={style}
		>
			<defs>
				<pattern
					id='hatch-pattern'
					width={HATCH_SPACING}
					height={HATCH_SPACING}
					patternUnits='userSpaceOnUse'
					patternTransform='rotate(45)'
				>
					<line x1='0' y1='0' x2='0' y2={HATCH_SPACING} stroke={HATCH_COLOR} strokeWidth='2' />
				</pattern>
			</defs>
			<rect width='100%' height='100%' fill='url(#hatch-pattern)' opacity='0.9' />
		</svg>
	)
}

export function FullWidthLine({ position = "top" }: { position?: "top" | "bottom" }) {
	return (
		<div
			className={cn("absolute bg-tertiary-border h-px", position === "top" ? "top-0" : "bottom-0")}
			style={fullWidthStyle}
		/>
	)
}

export function DividerLine({ position = "top" }: { position?: "top" | "bottom" }) {
	const isTop = position === "top"

	return (
		<>
			<div className={cn("absolute bg-tertiary-border h-px", isTop ? "top-0" : "bottom-0")} style={fullWidthStyle} />
			<div
				className={cn(
					"absolute inset-s-0 bg-primary-background border-[1.5px] border-tertiary-border rounded-full size-[10px] -translate-x-1/2 rtl:translate-x-1/2",
					isTop ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
				)}
			/>
			<div
				className={cn(
					"absolute inset-e-0 bg-primary-background border-[1.5px] border-tertiary-border rounded-full size-[10px] translate-x-1/2 rtl:-translate-x-1/2",
					isTop ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
				)}
			/>
		</>
	)
}
