import { Button } from "@/components/ui/button"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

export default async function CTA() {
	const t = await getTranslations("cta")

	return (
		<SectionWrapper>
			<div className='lg:py-10'>
				<div className='relative py-px'>
					<FullWidthLine position='top' />
					<FullWidthLine position='bottom' />
					<BgWrapper className='max-lg:bg-transparent max-lg:p-0 max-lg:rounded-none max-lg:outline-none'>
						<div className='relative flex flex-col gap-10 bg-[#191919] px-8 lg:px-[60px] xl:px-20 lg:py-24 xl:py-[120px] pt-10 rounded-none lg:rounded-[16px] w-full overflow-hidden'>
							<div className='flex flex-col gap-5 sm:gap-6 xl:gap-12 my-auto'>
								<p className='z-10 relative font-semibold text-[28px] text-white lg:text-4xl xl:text-5xl leading-[1.1] tracking-[-0.01em]'>
									{t("heading")}
									<br />
									<span className='text-tertiary-text'>{t("headingHighlight")}</span>
								</p>
								<div className='z-10 relative w-fit'>
									<Button
										className='hover:bg-primary-text/90 invert-100 px-4 sm:px-5 w-fit h-10 sm:h-11 text-sm sm:text-base'
										variant='default'
										href='https://app.oxxi.com/signup'
									>
										{t("button")}
									</Button>
									<div className='max-lg:hidden absolute-center bg-[#D8D8D8] opacity-30 blur-[68px] rounded-full w-[150%] h-[150%] pointer-events-none' />
								</div>
							</div>
							<div className='lg:inset-e-[5%] lg:-bottom-16 xl:bottom-2 lg:absolute relative mx-auto'>
								<div className='max-lg:hidden top-2 right-16 absolute bg-[#D8D8D8] opacity-30 blur-[68px] rounded-full w-[200px] h-16 pointer-events-none' />
								<Image
									className='object-contain'
									src='/cta/chat-promo.png'
									alt='Product image'
									width={512}
									height={331}
									draggable={false}
								/>
							</div>
						</div>
					</BgWrapper>
				</div>
			</div>
		</SectionWrapper>
	)
}
