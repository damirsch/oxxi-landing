import { FullWidthLine, HatchedPattern, SectionWrapper } from "@/components/ui/wrappers"
import { HeroShowcase } from "./showcase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function Hero() {
	const t = await getTranslations("hero")

	return (
		<SectionWrapper className='relative pt-[40px] md:pt-[60px]'>
			<article className='flex flex-col gap-y-6 sm:gap-y-8 px-3 md:px-0'>
				<div className='flex flex-col items-center gap-3 text-center'>
					<Badge className='text-[13px] sm:text-sm'>
						<div
							className='bg-[linear-gradient(135deg,#5C69F6_-55%,#48B0EC_50%,#8DDFFF_100%)] rounded-full size-2 shrink-0'
							aria-hidden
						/>
						{t("badge")}
					</Badge>
					<h1 className='font-heading font-semibold xl:text-[58px] text-4xl sm:text-5xl leading-[1.1] tracking-tight'>
						{t("heading")}
						<br />
						<span className='text-tertiary-text'>{t("headingHighlight")}</span>
					</h1>
					<p className='text-[13px] text-tertiary-text sm:text-[15px] xl:text-[17px] tracking-[-0.01em] cursor-default whitespace-pre-line'>
						{t("description")}
					</p>
				</div>
				<div className='relative flex flex-col items-center gap-y-3 w-full h-[90px] md:h-[120px]'>
					<div className='top-[22px] absolute inset-0'>
						<FullWidthLine position='top' />
						<FullWidthLine position='bottom' />
						<HatchedPattern />
					</div>
					<div className='z-10 relative flex gap-3'>
						<Button
							className='bg-surface-background hover:bg-[#fbfbfb] shadow-[0_4px_6px_0_rgba(0,0,0,0.04)] px-4 sm:px-5 h-10 sm:h-11 sm:text-[15px] text-sm'
							variant='secondary'
							href='#how-it-works'
						>
							{t("ctaSecondary")}
						</Button>
						<Button className='px-4 sm:px-5 h-10 sm:h-11 sm:text-[15px] text-sm' href='https://app.oxxi.com/signup'>
							{t("ctaPrimary")}
						</Button>
					</div>
				</div>
			</article>
			<HeroShowcase />
		</SectionWrapper>
	)
}
