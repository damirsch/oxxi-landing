"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"
import { Logo } from "@/components/ui/icons/logo"
import { CandidatePreviewCard, JobPostingCard } from "./entity-card"
import { BarChart } from "@/components/ui/charts/bar-chart"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function FeatureContent({ activeIndex }: { activeIndex: number }) {
	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={activeIndex}
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.12 } }}
				className={cn(
					"flex flex-col gap-3 lg:gap-4 mx-auto pt-5 lg:pt-12 lg:max-w-[660px] overflow-y-clip text-base",
					"xl:absolute xl:inset-0",
					"max-xl:h-full"
				)}
			>
				{activeIndex === 0 && <CandidateSearchContent />}
				{activeIndex === 1 && <JobPostingContent />}
				{activeIndex === 2 && <SalaryBenchmarkContent />}
			</motion.div>
		</AnimatePresence>
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
	const t = useTranslations("keyFeatures.content")
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
				className={cn(
					"bg-overlay-soft ms-auto mb-2.5 px-3.5 py-2.5 rounded-[10px] max-w-[260px] md:max-w-[unset] text-[13px] md:text-base",
					className
				)}
			>
				{userMessage}
			</motion.div>

			<div className='space-y-2.5'>
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.15, delay: 0.1 }}
					className='flex items-center gap-2 font-bold md:text-[17px] text-sm leading-none tracking-tight'
				>
					<Logo className='size-4 md:size-5' />
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
							<span className='md:text-[15px] text-sm'>{t("thinking")}</span>
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

				<p className='text-[13px] md:text-base tracking-[-0.01em]'>
					<BlurTypewriter text={responseText} delayMs={1200} durationMs={typeDurationMs ?? 1500} />
				</p>
			</div>

			{children}
		</>
	)
}

function CandidateSearchContent() {
	const t = useTranslations("keyFeatures.content.candidates")
	const tActions = useTranslations("keyFeatures.content.actions")
	return (
		<ChatSequence userMessage={t("userMessage")} responseText={t("response")}>
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 1.1 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.9 }}
			>
				<CandidatePreviewCard
					name={t("card1.name")}
					title={t("card1.title")}
					description={t("card1.description")}
					location={t("card1.location")}
					rate={t("card1.rate")}
					experience={t("card1.experience")}
					viewProfileLabel={tActions("viewProfile")}
					scheduleLabel={tActions("scheduleInterview")}
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
					name={t("card2.name")}
					title={t("card2.title")}
					description={t("card2.description")}
					location={t("card2.location")}
					rate={t("card2.rate")}
					experience={t("card2.experience")}
					viewProfileLabel={tActions("viewProfile")}
					scheduleLabel={tActions("scheduleInterview")}
					src='/key-features/avatar-2.png'
					className='opacity-50'
				/>
			</motion.div>
		</ChatSequence>
	)
}

function JobPostingContent() {
	const t = useTranslations("keyFeatures.content.jobs")
	const tActions = useTranslations("keyFeatures.content.actions")
	return (
		<ChatSequence userMessage={t("userMessage")} responseText={t("response")} typeDurationMs={1200}>
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 1.1 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.6 }}
			>
				<JobPostingCard
					title={t("card.title")}
					sectionTitle={t("card.sectionTitle")}
					description={t("card.description")}
					location={t("card.location")}
					salary={t("card.salary")}
					type={t("card.type")}
					badge={t("card.badge")}
					previewLabel={tActions("preview")}
					postJobLabel={tActions("postJob")}
					className='z-10 shadow-candidate-table'
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 3.1 }}
				className='px-1'
			>
				<h4 className='font-semibold text-sm md:text-base'>{t("responsibilities")}</h4>
				<ul className='space-y-1 mt-2 ps-4 text-secondary-text text-sm md:text-base list-disc'>
					<li>{t("responsibility1")}</li>
					<li>{t("responsibility2")}</li>
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

function SalaryBenchmarkContent() {
	const t = useTranslations("keyFeatures.content.salary")
	const tContent = useTranslations("keyFeatures.content")

	const salaryData = [
		{ name: t("levels.junior"), min: 42, max: 52 },
		{ name: t("levels.mid"), min: 55, max: 68 },
		{ name: t("levels.senior"), min: 65, max: 78 },
		{ name: t("levels.lead"), min: 72, max: 92 },
	]

	return (
		<ChatSequence userMessage={t("userMessage")} responseText={t("response")} typeDurationMs={1200}>
			<motion.div
				initial={{ opacity: 0, y: 16, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 2.6 }}
				className='flex-1 pb-5 xl:pb-8 min-h-[200px]'
			>
				<BarChart
					data={salaryData}
					yAxisLabel={tContent("yAxisLabel")}
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
