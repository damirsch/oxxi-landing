import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
	active?: boolean
	payload?: readonly { value?: number; dataKey?: string; payload?: Record<string, unknown> }[]
	label?: string | number
	coordinate?: { x: number; y: number }
	className?: string
	formatter?: (value: number) => string
	range?: boolean
}

export function ChartTooltip({ active, payload, label, className, formatter = (v) => String(v), range }: TooltipProps) {
	const lastRef = useRef<{
		payload: NonNullable<TooltipProps["payload"]>
		label: string | number | undefined
	} | null>(null)

	useEffect(() => {
		if (active && payload?.length) {
			lastRef.current = { payload, label }
		}
	}, [active, payload, label])

	const displayPayload = payload?.length ? payload : lastRef.current?.payload
	const displayLabel = label ?? lastRef.current?.label

	if (!displayPayload?.length) return null

	const item = displayPayload[0]?.payload
	if (!item) return null

	return (
		<div
			className={cn(
				"flex flex-col gap-2 bg-surface-background shadow-[0_2px_20px_rgba(0,0,0,0.08)] px-3 py-2.5 border border-overlay-regular rounded-xl whitespace-nowrap",
				className
			)}
			style={{
				opacity: active ? 1 : 0,
				pointerEvents: active ? "auto" : "none",
				transition: "opacity 0.1s ease",
			}}
		>
			{displayLabel && <p className='text-[13px] text-secondary-text leading-[1.2]'>{displayLabel}</p>}
			{range && item.min != null && item.max != null ? (
				<p className='font-semibold text-[15px] text-primary-text leading-none'>
					{formatter(Number(item.min))} – {formatter(Number(item.max))}
				</p>
			) : (
				<p className='font-semibold text-[15px] text-primary-text leading-none'>
					{formatter(displayPayload[0]?.value ?? 0)}
				</p>
			)}
		</div>
	)
}
