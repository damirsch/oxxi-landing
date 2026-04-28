import {
	IconBenchmark,
	IconCalendarCheck,
	IconCheck,
	IconCubeOutline,
	IconLayersThree,
	IconLightning,
	IconMessageChat,
	IconProps,
	IconRefresh,
	IconSearch,
	IconStars,
} from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { FC } from "react"
import { cn } from "@/lib/utils"

export type MarqueeBadgeItem = {
	Icon: FC<IconProps>
	text: string
}

const MARQUEE_BADGES_TOP: MarqueeBadgeItem[] = [
	{ Icon: IconLightning, text: "No setup required to start sourcing" },
	{ Icon: IconSearch, text: "Find candidates with a single message" },
	{ Icon: IconMessageChat, text: "Contact candidates without leaving the chat" },
	{ Icon: IconLayersThree, text: "Internal and external sourcing in one system" },
	{ Icon: IconStars, text: "AI-generated job drafts in seconds" },
	{ Icon: IconCheck, text: "One workspace for your entire team" },
]

const MARQUEE_BADGES_BOTTOM: MarqueeBadgeItem[] = [
	{ Icon: IconBenchmark, text: "Salary benchmarks built into the workflow" },
	{ Icon: IconCheck, text: "Compare candidates side by side" },
	{ Icon: IconCalendarCheck, text: "Schedule interviews from the candidate profile" },
	{ Icon: IconRefresh, text: "Hiring context that carries forward" },
	{ Icon: IconCubeOutline, text: "VReplaces your full hiring stack" },
	{ Icon: IconCheck, text: "Visual pipelines from applied to offer" },
]

export default function OxxiMarquee() {
	return (
		<SectionWrapper>
			<div className='relative flex flex-col items-center gap-8 py-24'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<SectionHeader title={"Oxxi becomes the layer\nyour hiring depends on"} />
				<div className='flex flex-col gap-2.5 w-full'>
					<BadgeMarqueeRow reverse items={MARQUEE_BADGES_TOP} />
					<BadgeMarqueeRow items={MARQUEE_BADGES_BOTTOM} />
				</div>
			</div>
		</SectionWrapper>
	)
}

function BadgeMarqueeRow({ reverse, items }: { reverse?: boolean; items: MarqueeBadgeItem[] }) {
	return (
		<div className='relative py-0.5 overflow-hidden'>
			<div className='left-0 z-10 absolute inset-y-0 bg-linear-to-r from-primary-background to-transparent w-20 pointer-events-none' />
			<div className='right-0 z-10 absolute inset-y-0 bg-linear-to-l from-primary-background to-transparent w-20 pointer-events-none' />
			<div className={cn("flex gap-2.5 w-max animate-marquee-badge-row", reverse && "[animation-direction:reverse]")}>
				<BadgeMarqueeStrip items={items} />
				<BadgeMarqueeStrip items={items} />
			</div>
		</div>
	)
}

function BadgeMarqueeStrip({ items }: { items: MarqueeBadgeItem[] }) {
	return (
		<div className='flex gap-2.5 shrink-0'>
			{items.map((item, i) => (
				<MarqueeBadge key={i} Icon={item.Icon} text={item.text} />
			))}
		</div>
	)
}

function MarqueeBadge({ Icon, text }: { Icon: FC<IconProps>; text: string }) {
	return (
		<div className='flex items-center gap-2 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] px-3 border border-primary-border rounded-[12px] h-10 min-h-10 text-secondary-text text-sm whitespace-nowrap'>
			<Icon className='size-[18px]' strokeWidth={1.3} />
			{text}
		</div>
	)
}
