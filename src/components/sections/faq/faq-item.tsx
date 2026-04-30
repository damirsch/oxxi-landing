"use client"
import { useState } from "react"
import { IconChevronUp } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

export function FAQItem({ question, answer }: { question: string; answer: string }) {
	const [open, setOpen] = useState(false)

	return (
		<button
			aria-expanded={open}
			onClick={() => setOpen((v) => !v)}
			className='py-6 border-secondary-border border-b w-full cursor-pointer'
		>
			<div className='flex justify-between items-center gap-4 py-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background w-full text-left'>
				<span className='text-base leading-[1.2] tracking-[-0.01em]'>{question}</span>
				<IconChevronUp
					aria-hidden
					strokeWidth={1.5}
					className={cn(
						"size-5 text-tertiary-text transition-transform duration-200 ease-in-out shrink-0",
						open ? "rotate-0" : "-rotate-180"
					)}
				/>
			</div>
			<div
				role='region'
				aria-hidden={!open}
				className={cn(
					"grid overflow-hidden transition-all duration-200 ease-in-out",
					open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				)}
			>
				<p
					className={cn(
						"min-h-0 overflow-hidden text-[15px] text-tertiary-text text-left leading-[1.4] tracking-[-0.01em] transition-all duration-200",
						open ? "pt-2" : "pt-0"
					)}
				>
					{answer}
				</p>
			</div>
		</button>
	)
}
