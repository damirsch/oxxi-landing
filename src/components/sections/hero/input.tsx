"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconArrowUp, IconChevronUp, IconMicrophone, IconPlugs, IconPlus } from "@/components/ui/icons"

const prompts = [
	"Find senior React developers in Berlin",
	"Schedule interviews for shortlisted candidates",
	"Write a job description for a product manager",
	"Source passive candidates with Python experience",
	"Send follow-ups to applicants from last week",
]

const INTERVAL = 4000

const roundPill = cva(
	"inline-flex justify-center items-center gap-2 rounded-full h-9 [&_svg]:size-5 text-sm whitespace-nowrap pointer-events-none select-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				icon: "border border-overlay-bold min-w-9 bg-transparent text-secondary-text",
				secondary: "border border-overlay-bold bg-transparent text-primary-text px-3",
				iconAccent: "bg-primary-text min-w-9 text-surface-background",
			},
		},
		defaultVariants: {
			variant: "icon",
		},
	}
)

export function HeroInput({ className }: { className?: string }) {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % prompts.length)
		}, INTERVAL)
		return () => clearInterval(id)
	}, [])

	return (
		<div
			className={cn(
				"relative flex flex-col bg-surface-background pb-3 border border-primary-border rounded-[20px] w-full",
				className
			)}
		>
			<div className='flex items-center gap-0 ps-4 pe-20 pt-3.5 pb-6 min-h-6 text-[15px] tracking-[-0.008em]'>
				<span className='bg-tertiary-text w-[1] h-[1.1em] animate-blink shrink-0' />
				<div className='relative flex-1 h-[1.4em] overflow-hidden'>
					<AnimatePresence initial={false} mode='popLayout'>
						<motion.span
							key={index}
							initial={{ y: "100%", opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: "-100%", opacity: 0 }}
							transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
							className='block text-tertiary-text/60 whitespace-nowrap'
						>
							{prompts[index]}
						</motion.span>
					</AnimatePresence>
				</div>
			</div>
			<div className='flex justify-between items-center px-3'>
				<div className='flex items-center gap-2'>
					<span className={roundPill({ variant: "icon" })} aria-hidden>
						<IconPlus strokeWidth={1.3} />
					</span>
					<span className={roundPill({ variant: "secondary" })} aria-hidden>
						<IconPlugs />
						Add
						<IconChevronUp className='-rotate-180 transition-transform duration-200' />
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<span className={cn(roundPill({ variant: "icon" }), "border-none")} aria-hidden>
						<IconMicrophone />
					</span>
					<span className={cn(roundPill({ variant: "iconAccent" }), "opacity-40")} aria-hidden>
						<IconArrowUp strokeWidth={2} />
					</span>
				</div>
			</div>
		</div>
	)
}
