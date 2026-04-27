type CustomXAxisTickProps = {
	x?: number | string
	y?: number | string
	payload?: { value: string }
	index?: number
	visibleTicksCount?: number
}

export function CustomXAxisTick({ x, y, payload }: CustomXAxisTickProps) {
	if (!payload || x == null || y == null) return null
	return (
		<text x={Number(x)} y={Number(y) + 16} fill='var(--color-tertiary-text)' fontSize={12} textAnchor='middle'>
			{payload.value}
		</text>
	)
}

type CustomYAxisTickProps = {
	x?: number | string
	y?: number | string
	payload?: { value: number }
	index?: number
	tickFormatter?: (value: number) => string
	fontSize?: number
}

export function CustomYAxisTick({ x, y, payload, tickFormatter, fontSize = 12 }: CustomYAxisTickProps) {
	if (!payload || x == null || y == null) return null
	const dy = 4
	const v = tickFormatter ? tickFormatter(payload.value) : payload.value
	return (
		<text
			x={Number(x) - 8}
			y={Number(y) + dy}
			fill='var(--color-tertiary-text)'
			fontSize={fontSize}
			textAnchor='end'
			style={{ fontVariantNumeric: "tabular-nums" }}
		>
			{v}
		</text>
	)
}
