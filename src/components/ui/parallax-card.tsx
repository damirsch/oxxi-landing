"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxCardProps {
	children: ReactNode
	className?: string
	speed?: number
	floatDuration?: number
	floatDistance?: number
}

export function ParallaxCard({
	children,
	className,
	speed = 50,
	floatDuration = 4,
	floatDistance = 6,
}: ParallaxCardProps) {
	const ref = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	})

	const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

	return (
		<motion.div ref={ref} style={{ y }} className={cn("relative will-change-transform", className)}>
			<motion.div
				animate={{ y: [-floatDistance, floatDistance, -floatDistance] }}
				transition={{
					duration: floatDuration,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				{children}
			</motion.div>
		</motion.div>
	)
}
