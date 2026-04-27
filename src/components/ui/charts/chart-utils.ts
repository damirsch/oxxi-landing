export interface BarDataPoint {
	name: string
	value?: number
	min?: number
	max?: number
}

export interface BarChartProps {
	data: BarDataPoint[]
	range?: boolean
	color?: string
	colors?: string[]
	height?: number | string
	className?: string
	yAxisFormatter?: (value: number) => string
	yAxisLabel?: string
	unit?: string
	suffix?: string
	barRadius?: number
	paddingBottom?: number
	noLeftOffset?: boolean
}

function niceStep(range: number, targetTicks = 6): number {
	const rawStep = range / targetTicks
	const magnitude = 10 ** Math.floor(Math.log10(rawStep))
	const normalized = rawStep / magnitude
	if (normalized <= 1) return magnitude
	if (normalized <= 2) return 2 * magnitude
	if (normalized <= 5) return 5 * magnitude
	return 10 * magnitude
}

export function getNiceTicks(dataMax: number): number[] {
	if (dataMax <= 0) return [0]
	const step = niceStep(dataMax)
	const ticks: number[] = []
	for (let t = 0; t <= dataMax * 1.05; t += step) ticks.push(Math.round(t))
	if (ticks.length > 0 && ticks[ticks.length - 1]! < dataMax) {
		ticks.push(Math.round(ticks[ticks.length - 1]! + step))
	}
	return ticks
}

export function getRangeTicks(dataMin: number, dataMax: number, targetTicks = 10): number[] {
	const range = dataMax - dataMin
	if (range <= 0) return [dataMin]
	const step = niceStep(range, targetTicks)
	const start = Math.floor(dataMin / step) * step
	const ticks: number[] = []
	for (let t = start; t <= dataMax * 1.05; t += step) ticks.push(Math.round(t))
	if (ticks.length > 0 && ticks[ticks.length - 1]! < dataMax) {
		ticks.push(Math.round(ticks[ticks.length - 1]! + step))
	}
	return ticks
}

export function calculateYAxisWidth(ticks: number[], formatter: (value: number) => string, charWidth = 12): number {
	const maxLabelLength = Math.max(...ticks.map((t) => formatter(t).length))
	return maxLabelLength * charWidth
}

export function createAxisFormatter(unit?: string, suffix?: string) {
	return (v: number) => `${unit ?? ""}${v}${suffix ?? ""}`
}
