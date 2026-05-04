import { Badge } from "@/components/ui/badge"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"

export const brandPartnerLogos = [
	{ src: "/partner-logos/Baraton.svg", alt: "Baraton" },
	{ src: "/partner-logos/Delivery.svg", alt: "Delivery" },
	{ src: "/partner-logos/Kait.svg", alt: "Kait" },
	{ src: "/partner-logos/MOOSH.svg", alt: "MOOSH" },
	{ src: "/partner-logos/Savor.svg", alt: "Savor" },
	{ src: "/partner-logos/UPayments.svg", alt: "UPayments" },
	{ src: "/partner-logos/Zad.svg", alt: "Zad" },
] as const

export const agencyPartnerLogos = [
	{ src: "/partner-logos/Veritone.svg", alt: "Veritone" },
	{ src: "/partner-logos/Broadbean.svg", alt: "Broadbean" },
] as const

export default function Partners() {
	return (
		<SectionWrapper>
			<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
				Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
			</p>
			<div className='relative flex flex-col mt-14'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<div className='relative flex flex-wrap justify-center items-center gap-4 sm:gap-12 px-6 py-11 border-secondary-border border-b w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>
						Hiring teams
					</Badge>
					{brandPartnerLogos.map((logo) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={logo.alt}
							src={logo.src}
							alt={logo.alt}
							className='w-auto h-5 sm:h-6 object-contain'
							draggable={false}
						/>
					))}
				</div>
				<div className='relative flex flex-wrap justify-center items-center gap-4 sm:gap-12 px-6 py-11 w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>
						Tech partners
					</Badge>
					{agencyPartnerLogos.map((logo) => (
						<div key={logo.alt} className='flex justify-center items-center h-5 sm:h-6'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={logo.src}
								alt={logo.alt}
								className={cn("w-auto object-contain", logo.alt === "Broadbean" ? "h-12" : "h-full")}
								draggable={false}
							/>
						</div>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
