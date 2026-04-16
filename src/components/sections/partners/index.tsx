import { Badge } from "@/components/ui/badge"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"

export const agencyPartnerLogos = [
	{ src: "/partner-logos/Veritone.svg", alt: "Veritone" },
	{ src: "/partner-logos/Broadbean.svg", alt: "Broadbean" },
] as const

export const brandPartnerLogos = [
	{ src: "/partner-logos/Baraton.svg", alt: "Baraton" },
	{ src: "/partner-logos/Delivery.svg", alt: "Delivery" },
	{ src: "/partner-logos/Kait.svg", alt: "Kait" },
	{ src: "/partner-logos/MOOSH.svg", alt: "MOOSH" },
	{ src: "/partner-logos/Savor.svg", alt: "Savor" },
	{ src: "/partner-logos/UPayments.svg", alt: "UPayments" },
	{ src: "/partner-logos/Zad.svg", alt: "Zad" },
] as const

export default function Partners() {
	return (
		<SectionWrapper>
			<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
				Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
			</p>
			<div className='relative flex mt-8'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<div className='relative place-items-center gap-4 sm:gap-12 grid grid-cols-4 px-6 py-11 border-secondary-border border-r w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>Brands</Badge>
					{brandPartnerLogos.map((logo) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={logo.alt}
							src={logo.src}
							alt={logo.alt}
							className='h-5 sm:h-6 w-auto object-contain'
							draggable={false}
						/>
					))}
				</div>
				<div className='relative place-items-center gap-8 sm:gap-12 grid grid-cols-2 px-6 py-11 w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>
						Agencies
					</Badge>
					{agencyPartnerLogos.map((logo) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={logo.alt}
							src={logo.src}
							alt={logo.alt}
							className={cn(
								"w-auto object-contain",
								logo.alt === "Broadbean" ? "h-12" : "h-5 sm:h-6"
							)}
							draggable={false}
						/>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
