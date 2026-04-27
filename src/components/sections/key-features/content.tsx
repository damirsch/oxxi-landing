"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Logo } from "@/components/ui/icons/logo"
import { CandidatePreviewCard } from "./candidate-card"

export function FeatureContent({ activeIndex }: { activeIndex: number }) {
	return (
		<div className='relative flex-1 px-10 min-w-0'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={activeIndex}
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.12 } }}
					className='absolute inset-0 flex flex-col gap-4 mx-auto pt-12 max-w-[660px] overflow-y-clip text-base'
				>
					{activeIndex === 0 && <CandidateSearchContent />}
					{activeIndex === 1 && (
						<PlaceholderContent
							title='Job Posting'
							description='AI-generated job drafts, one-click publishing across global boards'
						/>
					)}
					{activeIndex === 2 && (
						<PlaceholderContent
							title='Salary Benchmarks'
							description='Real-time salary data by role, location, and seniority level'
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

const RESPONSE_TEXT =
	"I found 12 marketing managers in UAE within your budget of 15\u201325K AED. Filtered by industry experience and seniority. Here\u2019s the top matches:"

function CandidateSearchContent() {
	const [showThinking, setShowThinking] = useState(false)

	useEffect(() => {
		const show = setTimeout(() => setShowThinking(true), 100)
		const hide = setTimeout(() => setShowThinking(false), 1000)
		return () => {
			clearTimeout(show)
			clearTimeout(hide)
		}
	}, [])

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='bg-overlay-soft ml-auto px-3.5 py-2.5 rounded-[10px]'
			>
				Find a marketing manager in UAE, budget is 15-25K AED
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.15, delay: 0.1 }}
				className='flex items-center gap-2 font-bold text-[17px] leading-none tracking-tight'
			>
				<Logo />
				OXXI
			</motion.div>

			<AnimatePresence>
				{showThinking && (
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className='flex items-center gap-1.5 text-tertiary-text'
					>
						<span className='text-[15px]'>Oxxi is thinking</span>
						<span className='flex items-center h-5 font-light text-[15px]'>
							{[0, 0.15, 0.3].map((delay) => (
								<motion.span
									key={delay}
									className='inline-block'
									animate={{ y: [0, -4, 0, 0] }}
									transition={{
										duration: 1.2,
										repeat: Infinity,
										ease: "easeInOut",
										delay,
										times: [0, 0.3, 0.6, 1],
									}}
								>
									&bull;
								</motion.span>
							))}
						</span>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.1 }}
				className='tracking-[-0.01em]'
			>
				<TypewriterText text={RESPONSE_TEXT} delayMs={1200} durationMs={1100} />
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, delay: 2.55 }}
			>
				<CandidatePreviewCard
					name='Ahmad Hassan'
					title='Marketing Manager'
					description='7+ years in B2B marketing across the GCC region. Led demand generation at a UAE-based SaaS company, growing inbound leads by 3x'
					location='Dubai, UAE'
					rate='25K AED/mo'
					experience='8 years of experience'
					src='/key-features/avatar-1.png'
					className='z-10 shadow-candidate-table'
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, delay: 2.7 }}
			>
				<CandidatePreviewCard
					name='Sara Al-Mutairi'
					title='Senior Marketing Manager'
					description='6+ years leading brand and content strategy for tech companies. Built and managed a'
					location='Dubai, UAE'
					rate='25K AED/mo'
					experience='8 years of experience'
					src='/key-features/avatar-2.png'
					className='opacity-70'
				/>
			</motion.div>
		</>
	)
}

function TypewriterText({ text, delayMs, durationMs }: { text: string; delayMs: number; durationMs: number }) {
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		el.textContent = ""
		const charInterval = durationMs / text.length
		let frame: number | undefined
		let startTime: number | null = null
		let lastCount = 0

		const tick = (ts: number) => {
			if (!startTime) startTime = ts
			const elapsed = ts - startTime
			const chars = Math.min(Math.floor(elapsed / charInterval), text.length)
			if (chars !== lastCount) {
				lastCount = chars
				el.textContent = text.slice(0, chars)
			}
			if (chars < text.length) {
				frame = requestAnimationFrame(tick)
			}
		}

		const timeout = setTimeout(() => {
			frame = requestAnimationFrame(tick)
		}, delayMs)

		return () => {
			clearTimeout(timeout)
			if (frame !== undefined) cancelAnimationFrame(frame)
		}
	}, [text, delayMs, durationMs])

	return <span ref={ref} />
}

function PlaceholderContent({ title, description }: { title: string; description: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, delay: 0.05 }}
			className='flex flex-col justify-center items-center gap-3 h-full text-center'
		>
			<h3 className='font-semibold text-2xl tracking-tight'>{title}</h3>
			<p className='max-w-[360px] text-[15px] text-secondary-text'>{description}</p>
		</motion.div>
	)
}
