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
import { getTranslations } from "next-intl/server"

const ICONS_TOP: FC<IconProps>[] = [IconLightning, IconSearch, IconMessageChat, IconLayersThree, IconStars, IconCheck]
const ICONS_BOTTOM: FC<IconProps>[] = [
	IconBenchmark,
	IconCheck,
	IconCalendarCheck,
	IconRefresh,
	IconCubeOutline,
	IconCheck,
]

export default async function OxxiMarquee() {
	const t = await getTranslations("marquee")
	const badgesTop = ICONS_TOP.map((Icon, i) => ({ Icon, text: t(`badgesTop.${i}`) }))
	const badgesBottom = ICONS_BOTTOM.map((Icon, i) => ({ Icon, text: t(`badgesBottom.${i}`) }))

	return (
		<SectionWrapper>
			<div className='relative flex flex-col items-center gap-7 md:gap-8 py-14 md:py-24'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<SectionHeader title={t("title")} />
				<div className='flex flex-col gap-2 sm:gap-2.5 w-full'>
					<BadgeMarqueeRow reverse items={badgesTop} />
					<BadgeMarqueeRow items={badgesBottom} />
				</div>
			</div>
		</SectionWrapper>
	)
}

type MarqueeBadgeItem = { Icon: FC<IconProps>; text: string }

function BadgeMarqueeRow({ reverse, items }: { reverse?: boolean; items: MarqueeBadgeItem[] }) {
	return (
		<div className='relative py-0.5 overflow-hidden' dir='ltr'>
			<div className='left-0 z-10 absolute inset-y-0 bg-linear-to-r from-primary-background to-transparent w-20 pointer-events-none' />
			<div className='right-0 z-10 absolute inset-y-0 bg-linear-to-l from-primary-background to-transparent w-20 pointer-events-none' />
			<div
				className={cn(
					"flex gap-2 sm:gap-2.5 w-max animate-marquee-badge-row",
					reverse && "[animation-direction:reverse]"
				)}
			>
				<BadgeMarqueeStrip items={items} />
				<BadgeMarqueeStrip items={items} />
			</div>
		</div>
	)
}

function BadgeMarqueeStrip({ items }: { items: MarqueeBadgeItem[] }) {
	return (
		<div className='flex gap-2 sm:gap-2.5 shrink-0'>
			{items.map((item, i) => (
				<MarqueeBadge key={i} Icon={item.Icon} text={item.text} />
			))}
		</div>
	)
}

function MarqueeBadge({ Icon, text }: { Icon: FC<IconProps>; text: string }) {
	return (
		<div className='flex items-center gap-2 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] px-3 border border-primary-border rounded-[10px] sm:rounded-[12px] h-9 sm:h-10 text-secondary-text' dir='auto'>
			<Icon className='size-4 sm:size-[18px]' strokeWidth={1.3} />
			<span className='text-[13px] sm:text-sm whitespace-nowrap'>{text}</span>
		</div>
	)
}
