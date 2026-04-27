import { useId, useMemo, useState } from "react"
import {
	ResponsiveContainer,
	BarChart as RechartsBarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"
import type { BarChartProps, BarDataPoint } from "./chart-utils"
import { getNiceTicks, getRangeTicks, calculateYAxisWidth, createAxisFormatter } from "./chart-utils"
import { CustomXAxisTick, CustomYAxisTick } from "./ticks"
import { ChartTooltip } from "./tooltip"

const DEFAULT_PALETTE = [
	"#AA89EE",
	"#EEB389",
	"#86AAF2",
	"#F286C6",
	"#7DD3C0",
	"#C9A0DC",
	"#F5C77A",
	"#89C4E1",
	"#E8A87C",
	"#95B8D1",
	"#D4A5A5",
	"#9DB4C8",
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RechartsTooltipContentProps = any

interface BarShapeProps {
	x?: number
	y?: number
	width?: number
	height?: number
	index?: number
	radius?: number
	fill?: string
	filterUrl?: string
	roundBottom?: boolean
	opacity?: number
	style?: React.CSSProperties
}

const DEFAULT_BAR_RADIUS = 8

function BarShape({
	x,
	y,
	width,
	height,
	radius = DEFAULT_BAR_RADIUS,
	fill,
	filterUrl,
	roundBottom = false,
	opacity = 1,
	style,
}: BarShapeProps) {
	if (x == null || y == null || width == null || height == null || height <= 0) return null
	const r = Math.min(radius, width / 2, height / 2)
	const top = y
	const bottom = y + height
	// SVG path for rounded rect: M=move, H/V=horizontal/vertical line, Q=quadratic curve (rounded corner), Z=close
	const d = roundBottom
		? `M${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${bottom - r}Q${
				x + width
		  },${bottom} ${x + width - r},${bottom}H${x + r}Q${x},${bottom} ${x},${bottom - r}V${top + r}Q${x},${top} ${
				x + r
		  },${top}Z`
		: `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${
				top + r
		  }V${bottom}Z`
	return (
		<path
			d={d}
			fill={fill}
			fillOpacity={opacity}
			filter={filterUrl}
			style={{ ...style, transition: "fill-opacity 0.8s ease" }}
		/>
	)
}

export function BarChart({
	data,
	range = false,
	color = "#AA89EE",
	colors = DEFAULT_PALETTE,
	height = 320,
	className,
	yAxisFormatter,
	yAxisLabel,
	unit,
	suffix,
	barRadius = DEFAULT_BAR_RADIUS,
	noLeftOffset = false,
	paddingBottom = 12,
}: BarChartProps) {
	const chartId = useId()
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const formatter = yAxisFormatter ?? createAxisFormatter(unit, suffix)
	const tooltipFormatter = (v: number) => `${unit ?? ""}${v}${suffix ?? ""}`

	const { yTicks, yDomain, domainMin } = useMemo<{
		yTicks: number[]
		yDomain: [number, number]
		domainMin: number
	}>(() => {
		if (range) {
			const dataMin = Math.min(...data.map((d) => d.min ?? 0))
			const dataMax = Math.max(...data.map((d) => d.max ?? 0))
			const rawTicks = getRangeTicks(dataMin, dataMax)
			const rest = rawTicks.filter((t) => t > dataMin)
			const ticks = rawTicks[0] === dataMin ? rawTicks : [dataMin, ...rest]
			const domainMax = ticks[ticks.length - 1] ?? dataMax
			return { yTicks: ticks, yDomain: [dataMin, domainMax] as [number, number], domainMin: dataMin }
		}
		const values = data.map((d) => d.value ?? 0)
		const ticks = getNiceTicks(Math.max(...values) * 1.2)
		return { yTicks: ticks, yDomain: [0, ticks[ticks.length - 1]] as [number, number], domainMin: 0 }
	}, [data, range])

	const globalMin = range ? Math.min(...data.map((d) => d.min ?? 0)) : 0

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const chartData: any[] = range
		? data.map((d) => {
				const min = d.min ?? 0
				const max = d.max ?? 0
				const base = min === globalMin ? domainMin : min
				return { name: d.name, range: [base, max], min, max }
		  })
		: data.map((d) => ({ name: d.name, value: d.value ?? 0 }))

	const yAxisWidth = calculateYAxisWidth(yTicks, formatter)

	const yAxisLabelMaxWidth = typeof height === "number" ? height - 70 : 250

	return (
		<div className={cn("relative **:outline-none w-full", className)} style={{ height }}>
			{yAxisLabel && (
				<div
					className={cn(
						"top-2 bottom-[42px] left-1 absolute w-10 overflow-hidden text-tertiary-text text-sm pointer-events-none",
						noLeftOffset && "-left-4"
					)}
					aria-hidden
				>
					<span
						className='top-1/2 left-1/2 absolute truncate'
						style={{
							maxWidth: yAxisLabelMaxWidth,
							transform: "translate(-50%, -50%) rotate(-90deg)",
						}}
					>
						{yAxisLabel}
					</span>
				</div>
			)}
			<div className={cn(`right-0 left-0 absolute bg-primary-border h-px`)} style={{ bottom: paddingBottom + 30 }} />
			<ResponsiveContainer width='100%' height='100%'>
				<RechartsBarChart
					data={chartData}
					margin={{ top: 8, right: 0, left: yAxisLabel && !noLeftOffset ? 40 : 20, bottom: paddingBottom }}
					barCategoryGap='30%'
					style={{ outline: "none" }}
					onMouseMove={(state) => {
						if (state?.isTooltipActive && state?.activeTooltipIndex !== undefined) {
							setActiveIndex(Number(state.activeTooltipIndex))
						} else {
							setActiveIndex(null)
						}
					}}
					onMouseLeave={() => setActiveIndex(null)}
				>
					<defs>
						{range ? (
							data.map((_, i) => {
								const c = colors[i % colors.length]
								return (
									<linearGradient key={i} id={`bar-grad-${chartId}-${i}`} x1='0' y1='0' x2='0' y2='1'>
										<stop offset='0%' stopColor={c} stopOpacity={1} />
										<stop offset='100%' stopColor={c} stopOpacity={0.8} />
									</linearGradient>
								)
							})
						) : (
							<linearGradient id={`bar-grad-${chartId}`} x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor={color} stopOpacity={1} />
								<stop offset='95%' stopColor={color} stopOpacity={0.6} />
							</linearGradient>
						)}
						{range &&
							data.map((_, i) => (
								<filter key={i} id={`bar-shadow-${chartId}-${i}`}>
									<feFlood floodColor='white' floodOpacity='0.18' />
									<feComposite in2='SourceGraphic' operator='in' />
									<feGaussianBlur stdDeviation='1.5' />
									<feComposite in2='SourceGraphic' operator='atop' />
								</filter>
							))}
					</defs>

					<CartesianGrid
						vertical={false}
						horizontalValues={yTicks.slice(1)}
						stroke='var(--color-primary-border)'
						strokeDasharray='8 4'
					/>

					<XAxis
						dataKey='name'
						axisLine={false}
						tickLine={false}
						tick={(p) => <CustomXAxisTick {...p} />}
						interval={0}
					/>

					<YAxis
						axisLine={{ stroke: "var(--color-primary-border)" }}
						tickLine={false}
						tick={(p) => <CustomYAxisTick {...p} tickFormatter={formatter} />}
						domain={yDomain}
						ticks={yTicks}
						width={yAxisWidth + 8}
						allowDecimals={false}
					/>

					<Tooltip
						content={(props: RechartsTooltipContentProps) => (
							<ChartTooltip {...props} formatter={tooltipFormatter} range={range} />
						)}
						cursor={false}
					/>

					<Bar
						dataKey={range ? "range" : "value"}
						fill={range ? undefined : `url(#bar-grad-${chartId})`}
						radius={range ? undefined : [barRadius, barRadius, 0, 0]}
						animationDuration={400}
						maxBarSize={48}
						shape={
							range
								? undefined
								: // eslint-disable-next-line @typescript-eslint/no-explicit-any
								  (props: any) => <BarShape {...props} radius={barRadius} fill={`url(#bar-grad-${chartId})`} />
						}
					>
						{chartData.map((_, index) => {
							const item = chartData[index] as { min?: number } | undefined
							const isMinBar = range && item && item.min === globalMin
							const cellRadius =
								range && isMinBar
									? ([barRadius, barRadius, 0, 0] as const)
									: range
									? ([barRadius, barRadius, barRadius, barRadius] as const)
									: undefined
							return (
								<Cell
									key={index}
									fill={range ? `url(#bar-grad-${chartId}-${index})` : undefined}
									radius={cellRadius as React.ComponentProps<typeof Cell>["radius"]}
									opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
									style={{ transition: "opacity 0.1s ease" }}
								/>
							)
						})}
					</Bar>
				</RechartsBarChart>
			</ResponsiveContainer>
		</div>
	)
}

export type { BarDataPoint }
