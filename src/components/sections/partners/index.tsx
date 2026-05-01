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
	{ src: "/partner-logos/broadbean.svg", alt: "Broadbean" },
] as const

function LogoStrip() {
	return (
		<div className='flex items-center gap-14 animate-marquee shrink-0'>
			{logos.map((logo) => (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					key={logo.alt}
					src={logo.src}
					alt={logo.alt}
					className='opacity-40 grayscale w-auto h-6 sm:h-7 object-contain'
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
			<div className='relative mt-4 py-8 overflow-hidden'>
				<div className='left-0 z-10 absolute inset-y-0 bg-linear-to-r from-primary-background to-transparent w-20 pointer-events-none' />
				<div className='right-0 z-10 absolute inset-y-0 bg-linear-to-l from-primary-background to-transparent w-20 pointer-events-none' />
				<div className='flex gap-14'>
					<LogoStrip />
					<LogoStrip />
				</div>
			</div>
		</SectionWrapper>
	)
}
