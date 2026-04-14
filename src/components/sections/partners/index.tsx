import { Badge } from "@/components/ui/badge"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import Image from "next/image"

export const partnerLogos = [
	{ src: "/partner-logos/Baraton.svg", alt: "Baraton" },
	{ src: "/partner-logos/Delivery.svg", alt: "Delivery" },
	{ src: "/partner-logos/Kait.svg", alt: "Kait" },
	{ src: "/partner-logos/MOOSH.svg", alt: "MOOSH" },
	{ src: "/partner-logos/Savor.svg", alt: "Savor" },
	{ src: "/partner-logos/UPayments.svg", alt: "UPayments" },
	{ src: "/partner-logos/Veritone.svg", alt: "Veritone" },
	{ src: "/partner-logos/Zad.svg", alt: "Zad" },
] as const

const half = partnerLogos.length / 2

export const brandsPartnerLogos = partnerLogos.slice(0, half)
export const agenciesPartnerLogos = partnerLogos.slice(half)

export default function Partners() {
	return (
		<SectionWrapper>
			<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
				Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
			</p>
			<div className='relative flex mt-8'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<div className='relative place-items-center gap-x-4 grid grid-cols-4 px-6 py-11 border-secondary-border border-r w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>Brands</Badge>
					{brandsPartnerLogos.map((logo) => (
						<Image
							key={logo.alt}
							src={logo.src}
							alt={logo.alt}
							width={120}
							height={24}
							unoptimized
							className='h-5 sm:h-6 object-contain'
							draggable={false}
						/>
					))}
				</div>
				<div className='relative place-items-center gap-x-4 grid grid-cols-4 px-6 py-11 w-full'>
					<Badge className='top-0 left-1/2 absolute rounded-[6px] h-8 -translate-x-1/2 -translate-y-1/2'>
						Agencies
					</Badge>
					{agenciesPartnerLogos.map((logo) => (
						<Image
							key={logo.alt}
							src={logo.src}
							alt={logo.alt}
							width={120}
							height={24}
							unoptimized
							className='h-5 sm:h-6 object-contain'
							draggable={false}
						/>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
