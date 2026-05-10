"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
	value: number
	duration?: number
	className?: string
	prefix?: string
	suffix?: string
}

export function AnimatedCounter({ value, duration = 300, className, prefix = "", suffix = "" }: AnimatedCounterProps) {
	const [displayValue, setDisplayValue] = useState(value)
	const previousValue = useRef(value)
	const animationRef = useRef<number | null>(null)

	useEffect(() => {
		if (previousValue.current === value) return

		const startValue = previousValue.current
		const startTime = performance.now()

		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
		}

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const easeOut = 1 - Math.pow(1 - progress, 3)
			const current = Math.round(startValue + (value - startValue) * easeOut)

			setDisplayValue(current)

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate)
			} else {
				previousValue.current = value
				animationRef.current = null
			}
		}

		animationRef.current = requestAnimationFrame(animate)
		previousValue.current = value

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [value, duration])

	return (
		<span className={cn("inline-block", className)}>
			{prefix}
			{displayValue}
			{suffix}
		</span>
	)
}
