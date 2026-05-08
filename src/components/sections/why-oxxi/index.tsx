import { IconCheckCircle, IconStars, IconXCircle } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

const WHY_OXXI = [
	{
		id: "traditional" as const,
		image: "/why-oxxi/1.png",
		Icon: IconXCircle,
		color: "text-danger-primary",
		border: "border-secondary-border lg:border-r ",
	},
	{
		id: "oxxi" as const,
		image: "/why-oxxi/2.png",
		Icon: IconCheckCircle,
		color: "text-success-primary",
		border: "max-lg:border-t border-secondary-border",
	},
] as const

export default async function WhyOxxi() {
	const t = await getTranslations("whyOxxi")

	return (
		<SectionWrapper className='flex flex-col pb-10'>
			<SectionHeader title={t("title")} badgeTitle={t("badge")} badgeIcon={<IconStars />} />
			<div className='relative flex lg:flex-row flex-col'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />

				{WHY_OXXI.map((item) => (
					<div
						key={item.id}
						className={cn("flex flex-col items-center gap-6 px-5 md:px-10 pt-8 lg:pt-5 pb-10 w-full", item.border)}
					>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={cn(
									"flex items-center gap-1.5 font-semibold text-[15px] md:text-base leading-none tracking-[-0.01em]",
									item.color
								)}
							>
								<item.Icon className='size-4' />
								{t(`items.${item.id}.title`)}
							</div>
							<span className='font-semibold text-tertiary-text md:text-[15px] text-sm text-center tracking-[-0.01em]'>
								{t(`items.${item.id}.description`)}
							</span>
						</div>
						<Image
							className='shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] border border-primary-border rounded-[10px] sm:rounded-[14px] object-contain pointer-events-none select-none'
							src={item.image}
							alt={t(`items.${item.id}.title`)}
							width={520}
							height={280}
							draggable={false}
						/>
					</div>
				))}
			</div>
		</SectionWrapper>
	)
}
