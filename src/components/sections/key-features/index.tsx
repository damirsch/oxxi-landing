"use client"
import { useCallback, useEffect, useRef, useState, type FC } from "react"
import { IconTool2, type IconProps } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import { FeatureContent } from "./content"
import { CYCLE_MS, KEY_FEATURE_ITEMS } from "./constants"

function useFeatureTabCycle() {
	const count = KEY_FEATURE_ITEMS.length
	const [activeIndex, setActiveIndex] = useState(0)
	const [cycle, setCycle] = useState(0)
	const [isInView, setIsInView] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)
	const [pinned, setPinned] = useState(false)
	const inViewRootRef = useRef<HTMLDivElement>(null)
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
		const el = inViewRootRef.current
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
			{ threshold: 0, rootMargin: "64px 0px 96px 0px" }
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

	return { inViewRootRef, activeIndex, cycle, hasStarted, isInView, select }
}

export default function KeyFeatures() {
	const { inViewRootRef, activeIndex, cycle, hasStarted, isInView, select } = useFeatureTabCycle()

	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader
				title='Everything you need to hire'
				description='Public web sourcing, job distribution, salary benchmarks'
				badgeTitle='Key Features'
				badgeIcon={<IconTool2 />}
			/>
			<div className='relative py-px'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<BgWrapper
					ref={inViewRootRef}
					className='xl:flex-row lg:flex-col flex-col-reverse max-lg:gap-0 max-lg:p-0 rounded-none lg:rounded-[16px]'
				>
					<aside className='flex lg:flex-row flex-col xl:flex-col gap-1.5 p-5 lg:p-0 max-lg:border-primary-border max-lg:border-t xl:max-w-[340px]'>
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
					<div className='relative xl:flex-1 px-5 lg:px-10 lg:border border-secondary-border rounded-[14px] w-full min-w-0 h-[450px] lg:h-[550px] xl:h-[unset] overflow-hidden'>
						{hasStarted && <FeatureContent activeIndex={activeIndex} />}
					</div>
				</BgWrapper>
			</div>
		</SectionWrapper>
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
				"flex items-center p-4 lg:p-8 xl:p-9 border rounded-[12px] lg:rounded-[14px] w-full min-h-0 text-left transition-all duration-300",
				isActive
					? "bg-surface-background select-text shadow-[0_2px_6px_0_rgba(0,0,0,0.04)] border-primary-border"
					: "bg-white/40 lg:bg-[#F6F6F6] shadow-[0_2px_6px_0_rgba(0,0,0,0.03)] border-secondary-border hover:bg-[#fcfcfc] max-lg:py-2 max-lg:rounded-[8px] cursor-pointer"
			)}
		>
			<div className='flex items-stretch w-full min-w-0'>
				<div
					className='flex flex-col bg-secondary-border rounded-full w-[2px] min-h-0 overflow-hidden select-none shrink-0'
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
				<div className='flex flex-col flex-1 px-4 py-1 lg:py-2 min-w-0'>
					<div className='flex items-center gap-2 font-semibold text-sm lg:text-base'>
						<Icon className={cn("size-[18px]", isActive ? "text-secondary-text" : "text-tertiary-text")} />
						<span className={cn(isActive ? "cursor-text" : "text-secondary-text")}>{title}</span>
					</div>
					<div
						className={cn(
							"grid transition-all duration-300 lg:grid-rows-[1fr] lg:opacity-100 lg:mt-2",
							isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "max-lg:grid-rows-[0fr] max-lg:opacity-0 max-lg:mt-0"
						)}
					>
						<p
							className={cn(
								"overflow-hidden text-[13px] xl:text-[15px] lg:text-sm min-h-0",
								isActive ? "cursor-text text-secondary-text" : "text-tertiary-text"
							)}
						>
							{description}
						</p>
					</div>
				</div>
			</div>
		</button>
	)
}
