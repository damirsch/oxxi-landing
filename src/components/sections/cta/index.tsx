import { Button } from "@/components/ui/button"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import Image from "next/image"

export default function CTA() {
	return (
		<SectionWrapper>
			<div className='py-10'>
				<div className='relative py-px'>
					<FullWidthLine position='top' />
					<FullWidthLine position='bottom' />
					<BgWrapper>
						<div className='flex flex-col gap-12 bg-[#191919] px-20 py-[120px] rounded-[16px] w-full'>
							<p className='z-10 relative font-semibold text-white text-5xl leading-[1.1] tracking-[-0.01em]'>
								Your next hire starts
								<br />
								<span className='text-tertiary-text'>with a message</span>
							</p>
							<div className='z-10 relative w-fit'>
								<Button className='hover:bg-primary-text/90 invert-100 px-5 w-fit h-11 text-base' variant='default'>
									Start for free
								</Button>
								<div className='absolute-center bg-[#D8D8D8] opacity-30 blur-[68px] rounded-full w-[150%] h-[150%] pointer-events-none' />
							</div>
							<div className='right-[6%] bottom-2 absolute'>
								<div className='top-2 right-16 absolute bg-[#D8D8D8] opacity-30 blur-[68px] rounded-full w-[200px] h-16 pointer-events-none' />
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
