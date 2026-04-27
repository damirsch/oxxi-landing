"use client"

import { SectionWrapper } from "@/components/ui/wrappers"

const logos = [
	{ src: "/partner-logos/Baraton.svg", alt: "Baraton" },
	{ src: "/partner-logos/Delivery.svg", alt: "Delivery" },
	{ src: "/partner-logos/Kait.svg", alt: "Kait" },
	{ src: "/partner-logos/MOOSH.svg", alt: "MOOSH" },
	{ src: "/partner-logos/Savor.svg", alt: "Savor" },
	{ src: "/partner-logos/UPayments.svg", alt: "UPayments" },
	{ src: "/partner-logos/Zad.svg", alt: "Zad" },
	{ src: "/partner-logos/Veritone.svg", alt: "Veritone" },
	{ src: "/partner-logos/Broadbean.svg", alt: "Broadbean" },
] as const

function LogoStrip() {
	return (
		<div className='flex items-center gap-14 shrink-0 animate-marquee'>
			{logos.map((logo) => (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					key={logo.alt}
					src={logo.src}
					alt={logo.alt}
					className='h-6 sm:h-7 w-auto object-contain opacity-40 grayscale'
					draggable={false}
				/>
			))}
		</div>
	)
}

export default function Partners() {
	return (
		<SectionWrapper>
			<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
				Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
			</p>
			<div className='relative mt-8 overflow-hidden py-8'>
				<div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-primary-background to-transparent' />
				<div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-primary-background to-transparent' />
				<div className='flex gap-14'>
					<LogoStrip />
					<LogoStrip />
				</div>
			</div>
		</SectionWrapper>
	)
}
