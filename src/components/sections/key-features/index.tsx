"use client"

import { useCallback, useEffect, useRef, useState, type FC } from "react"
import { IconBenchmark, IconCandidate, IconJob, IconKey, type IconProps } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import { FeatureContent } from "./content"

export const CYCLE_MS = 6_000

const KEY_FEATURE_ITEMS = [
	{
		title: "AI Headhunting",
		description: "Find top candidates or build your entire team with a single message",
		Icon: IconCandidate,
	},
	{
		title: "Job Distribution",
		description: "Create a job once and publish automatically across global job boards",
		Icon: IconJob,
	},
	{
		title: "Salary Benchmarks",
		description: "Compare salaries by role, location, and experience — real-time data",
		Icon: IconBenchmark,
	},
] as const

export default function KeyFeatures() {
	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader
				title='Everything you need to hire'
				description='Public web sourcing, job distribution, salary benchmarks'
				badgeTitle='Key Features'
				badgeIcon={<IconKey />}
			/>
			<div className='relative py-px'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<div className='relative flex gap-2 bg-overlay-subtle p-2 rounded-[16px] outline outline-secondary-border'>
					<FeatureTabs />
				</div>
			</div>
		</SectionWrapper>
	)
}

function FeatureTabs() {
	const count = KEY_FEATURE_ITEMS.length
	const [activeIndex, setActiveIndex] = useState(0)
	const [cycle, setCycle] = useState(0)
	const [isInView, setIsInView] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)
	const [pinned, setPinned] = useState(false)
	const asideRef = useRef<HTMLElement>(null)
	const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
	const elapsedRef = useRef(0)
	const lastTickRef = useRef(0)

	const select = useCallback(
		(index: number) => {
			if (index === activeIndex) {
				setPinned(true)
				return
			}
			setPinned(false)
			setActiveIndex(index)
			setCycle((c) => c + 1)
			elapsedRef.current = 0
		},
		[activeIndex]
	)

	useEffect(() => {
		const el = asideRef.current
		if (!el) return
		let startTimer: ReturnType<typeof setTimeout> | undefined
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting)
				if (entry.isIntersecting) {
					startTimer = setTimeout(() => setHasStarted(true), 0)
				} else {
					clearTimeout(startTimer)
					setHasStarted(false)
					setActiveIndex(0)
					setCycle((c) => c + 1)
					setPinned(false)
					elapsedRef.current = 0
				}
			},
			{ threshold: 0.3 }
		)
		observer.observe(el)
		return () => {
			observer.disconnect()
			clearTimeout(startTimer)
		}
	}, [])

	useEffect(() => {
		elapsedRef.current = 0
	}, [activeIndex, cycle])

	useEffect(() => {
		if (!isInView || !hasStarted || pinned) return
		const remaining = CYCLE_MS - elapsedRef.current
		lastTickRef.current = performance.now()
		timerRef.current = setTimeout(() => {
			elapsedRef.current = 0
			setActiveIndex((i) => (i + 1) % count)
		}, remaining)
		return () => {
			elapsedRef.current += performance.now() - lastTickRef.current
			clearTimeout(timerRef.current)
		}
	}, [isInView, hasStarted, activeIndex, count, cycle, pinned])

	return (
		<>
			<aside ref={asideRef} className='flex flex-col gap-1.5 max-w-[340px]'>
				{KEY_FEATURE_ITEMS.map((feature, index) => (
					<KeyFeatureCard
						key={feature.title}
						title={feature.title}
						description={feature.description}
						Icon={feature.Icon as FC<IconProps>}
						isActive={index === activeIndex}
						isRunning={isInView && hasStarted}
						animationKey={`${activeIndex}-${cycle}`}
						onSelect={() => select(index)}
					/>
				))}
			</aside>
			{hasStarted && <FeatureContent key={`${cycle}-${activeIndex}`} activeIndex={activeIndex} />}
		</>
	)
}

interface KeyFeatureCardProps {
	title: string
	description: string
	isActive: boolean
	isRunning: boolean
	animationKey: string
	onSelect: () => void
	Icon: FC<IconProps>
}

function KeyFeatureCard({
	title,
	description,
	isActive,
	isRunning,
	animationKey,
	onSelect,
	Icon,
}: KeyFeatureCardProps) {
	return (
		<button
			type='button'
			aria-pressed={isActive}
			onClick={onSelect}
			className={cn(
				"flex p-9 border border-primary-border rounded-[14px] w-full text-left transition-colors",
				isActive
					? "bg-surface-background select-text shadow-[0_2px_6px_0_rgba(0,0,0,0.04)]"
					: "bg-[#F6F6F6] shadow-[0_2px_6px_0_rgba(0,0,0,0.03)] hover:bg-[#fcfcfc] cursor-pointer"
			)}
		>
			<div
				className='flex flex-col bg-secondary-border rounded-full w-[2px] overflow-hidden select-none shrink-0'
				aria-hidden
			>
				{isActive ? (
					<div
						key={animationKey}
						className='bg-brand-primary rounded-full w-full'
						style={{
							animation: `progress-fill ${CYCLE_MS}ms linear forwards`,
							animationPlayState: isRunning ? "running" : "paused",
						}}
					/>
				) : null}
			</div>
			<div className='flex flex-col gap-2 px-4 py-2'>
				<div className='flex items-center gap-2 font-semibold text-base'>
					<Icon className={cn("size-[18px]", isActive ? "text-secondary-text" : "text-tertiary-text")} />
					<span className={cn(isActive ? "cursor-text" : "text-secondary-text")}>{title}</span>
				</div>
				<p className={cn("text-[15px]", isActive ? "cursor-text text-secondary-text" : "text-tertiary-text")}>
					{description}
				</p>
			</div>
		</button>
	)
}
