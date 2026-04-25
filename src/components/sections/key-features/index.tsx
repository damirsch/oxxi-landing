"use client"

import { useCallback, useEffect, useRef, useState, type FC } from "react"
import { IconBenchmark, IconCandidate, IconJob, IconKey, type IconProps } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"

const CYCLE_MS = 6_000

const KEY_FEATURE_ITEMS = [
	{
		title: "AI Candidate Search",
		description: "Describe who you need — Oxxi finds matching profiles based on your requirements",
		Icon: IconCandidate,
	},
	{
		title: "Job Posting",
		description: "Create and publish roles with AI-generated drafts — edit, post, done",
		Icon: IconJob,
	},
	{
		title: "Salary Benchmarks",
		description: "Compare rates by role, location, and seniority — make confident offers backed by real data",
		Icon: IconBenchmark,
	},
] as const

export default function KeyFeatures() {
	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader
				title='Everything you need to hire'
				description='Less setup, fewer tools, faster hiring'
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
	const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

	const select = useCallback((index: number) => {
		setActiveIndex(index)
		setCycle((c) => c + 1)
	}, [])

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setActiveIndex((i) => (i + 1) % count)
		}, CYCLE_MS)
		return () => clearTimeout(timerRef.current)
	}, [activeIndex, count, cycle])

	return (
		<aside className='flex flex-col gap-1.5 max-w-[340px]'>
			{KEY_FEATURE_ITEMS.map((feature, index) => (
				<KeyFeatureCard
					key={feature.title}
					title={feature.title}
					description={feature.description}
					Icon={feature.Icon as FC<IconProps>}
					isActive={index === activeIndex}
					animationKey={`${activeIndex}-${cycle}`}
					onSelect={() => select(index)}
				/>
			))}
		</aside>
	)
}

interface KeyFeatureCardProps {
	title: string
	description: string
	isActive: boolean
	animationKey: string
	onSelect: () => void
	Icon: FC<IconProps>
}

function KeyFeatureCard({ title, description, isActive, animationKey, onSelect, Icon }: KeyFeatureCardProps) {
	return (
		<button
			type='button'
			aria-pressed={isActive}
			onClick={onSelect}
			className={cn(
				"flex shadow-[0_2px_6px_0_rgba(0,0,0,0.04)] p-9 border border-primary-border rounded-[14px] w-full text-left transition-colors",
				isActive ? "bg-surface-background select-text" : "bg-[#F6F6F6] hover:bg-[#fcfcfc] cursor-pointer"
			)}
		>
			<div
				className='flex flex-col bg-secondary-border rounded-full w-[2px] select-none shrink-0 overflow-hidden'
				aria-hidden
			>
				{isActive ? (
					<div
						key={animationKey}
						className='bg-brand-primary rounded-full w-full'
						style={{ animation: `progress-fill ${CYCLE_MS}ms linear forwards` }}
					/>
				) : null}
			</div>
			<div className='flex flex-col gap-2 px-4 py-2'>
				<div className='flex items-center gap-2 font-semibold text-base'>
					<Icon className={cn("size-[18px]", isActive ? "text-secondary-text" : "text-tertiary-text")} />
					<span className={cn(isActive ? "cursor-text text-primary-text" : "text-secondary-text")}>
						{title}
					</span>
				</div>
				<p className={cn("text-[15px]", isActive ? "cursor-text text-secondary-text" : "text-tertiary-text")}>
					{description}
				</p>
			</div>
		</button>
	)
}
