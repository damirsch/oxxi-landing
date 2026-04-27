"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"
import { Logo } from "@/components/ui/icons/logo"
import { CandidatePreviewCard, JobPostingCard } from "./entity-card"
import { BarChart } from "@/components/ui/charts/bar-chart"
import { cn } from "@/lib/utils"

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
					{activeIndex === 1 && <JobPostingContent />}
					{activeIndex === 2 && <SalaryBenchmarkContent />}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

function ChatSequence({
	userMessage,
	responseText,
	typeDurationMs,
	children,
	className,
}: {
	userMessage: string
	responseText: string
	typeDurationMs?: number
	children: ReactNode
	className?: string
}) {
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
				className={cn("bg-overlay-soft mb-2.5 ml-auto px-3.5 py-2.5 rounded-[10px]", className)}
			>
				{userMessage}
			</motion.div>

			<div className='space-y-2.5'>
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

				<p className='tracking-[-0.01em]'>
					<BlurTypewriter text={responseText} delayMs={1200} durationMs={typeDurationMs ?? 1500} />
				</p>
			</div>

			{children}
		</>
	)
}

function CandidateSearchContent() {
	return (
		<ChatSequence
			userMessage='Find a marketing manager in UAE, budget is 15-25K AED'
			responseText={
				"I found 12 marketing managers in UAE within your budget of 15\u201325K AED. Filtered by industry experience and seniority. Here\u2019s the top matches:"
			}
		>
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 1.1 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.9 }}
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
				initial={{ opacity: 0, y: 20, scale: 1.1 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 3.0 }}
			>
				<CandidatePreviewCard
					name='Sara Al-Mutairi'
					title='Senior Marketing Manager'
					description='6+ years leading brand and content strategy for tech companies. Built and managed a'
					location='Dubai, UAE'
					rate='25K AED/mo'
					experience='8 years of experience'
					src='/key-features/avatar-2.png'
					className='opacity-50'
				/>
			</motion.div>
		</ChatSequence>
	)
}

function JobPostingContent() {
	return (
		<ChatSequence
			userMessage='Create a job post for a Senior Product Designer, remote, $90-120K'
			responseText={
				"Done! I\u2019ve drafted a job post based on your requirements. Review the details and publish when ready:"
			}
			typeDurationMs={1200}
		>
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 1.1 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.6 }}
			>
				<JobPostingCard
					title='Senior Product Designer'
					sectionTitle='Job Introduction'
					description="We're looking for a Senior Product Designer to lead end-to-end design for our B2B platform. You'll own the design system, run user research, and ship features that simplify complex workflows for enterprise teams"
					location='Remote (US)'
					salary='$90k–$120k'
					type='Full-time'
					className='z-10 shadow-candidate-table'
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 3.1 }}
				className='px-1'
			>
				<h4 className='font-semibold text-base'>Responsibilities</h4>
				<ul className='space-y-1 mt-2 pl-4 text-secondary-text text-base list-disc'>
					<li>Own the end-to-end design process from research to final handoff</li>
					<li>Collaborate with product and engineering on new features</li>
				</ul>
			</motion.div>
		</ChatSequence>
	)
}

function BlurTypewriter({ text, delayMs, durationMs }: { text: string; delayMs: number; durationMs: number }) {
	const words = text.split(" ")
	const [visibleCount, setVisibleCount] = useState(0)

	useEffect(() => {
		const wordInterval = durationMs / words.length
		let frame: number | undefined
		let startTime: number | null = null
		let lastCount = 0

		const tick = (ts: number) => {
			if (!startTime) startTime = ts
			const elapsed = ts - startTime
			const count = Math.min(Math.floor(elapsed / wordInterval) + 1, words.length)
			if (count !== lastCount) {
				lastCount = count
				setVisibleCount(count)
			}
			if (count < words.length) {
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
	}, [words.length, delayMs, durationMs])

	return (
		<>
			{words.map((word, i) => (
				<span
					key={i}
					className='inline-block transition-all duration-300'
					style={{
						opacity: i < visibleCount ? 1 : 0,
						filter: i < visibleCount ? "blur(0px)" : "blur(4px)",
					}}
				>
					{word}
					{i < words.length - 1 ? "\u00A0" : ""}
				</span>
			))}
		</>
	)
}

const SALARY_DATA = [
	{ name: "Junior", min: 42, max: 52 },
	{ name: "Mid", min: 55, max: 68 },
	{ name: "Senior", min: 65, max: 78 },
	{ name: "Lead", min: 72, max: 92 },
]

function SalaryBenchmarkContent() {
	return (
		<ChatSequence
			userMessage='Show me salary benchmarks for Product Designers in Europe'
			responseText={
				"Here\u2019s a salary overview for Product Designers across seniority levels in Europe, based on current market data:"
			}
			typeDurationMs={1200}
		>
			<motion.div
				initial={{ opacity: 0, y: 16, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.6 }}
				className='flex-1 pb-8 min-h-[200px]'
			>
				<BarChart
					data={SALARY_DATA}
					yAxisLabel='Annual salary'
					range
					height='100%'
					unit={"\u20AC"}
					suffix='k'
					noLeftOffset
					paddingBottom={0}
				/>
			</motion.div>
		</ChatSequence>
	)
}
