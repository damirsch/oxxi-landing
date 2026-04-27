"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ParallaxCard } from "@/components/ui/parallax-card"
import { HeroInput } from "./input"

const container = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.18 },
	},
}

const item = {
	hidden: { opacity: 0, y: 32 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
	},
}

export function HeroShowcase() {
	return (
		<div className='relative overflow-visible'>
			<motion.div variants={container} initial='hidden' animate='visible'>
				{/* Product screenshot */}
				<div className='relative'>
					<Image
						className='rounded-[16px] rounded-b-none w-full h-auto select-none pointer-events-none'
						src='/hero/product.png'
						alt='Product'
						width={1200}
						height={636}
						priority
						draggable={false}
					/>
					<div className='absolute -inset-px bg-linear-to-b from-primary-border to-tertiary-border rounded-[17px] rounded-b-none gradient-outline pointer-events-none' />
					<div
						className='-bottom-0.5 z-10 absolute inset-0 pointer-events-none'
						style={{
							background:
								"linear-gradient(to bottom, transparent 0%, transparent 79%, color-mix(in oklch, var(--color-primary-background) 90%, transparent) 92%, var(--color-primary-background) 100%)",
						}}
					/>
				</div>

				{/* Right card — appears first, further away so subtler motion */}
				<motion.div variants={item} className='top-[18%] -right-[12%] z-20 absolute w-[26%]'>
					<ParallaxCard className='rotate-8' speed={25} floatDuration={4} floatDistance={3}>
						<Image
							className='shadow-card border border-secondary-border rounded-xl w-full h-auto select-none pointer-events-none'
							src='/hero/card-1.png'
							alt='Sidebar'
							width={903}
							height={498}
							draggable={false}
						/>
					</ParallaxCard>
				</motion.div>

				{/* Left card — appears second, closer so stronger motion */}
				<motion.div variants={item} className='top-[34%] -left-[8%] z-20 absolute w-[33%]'>
					<ParallaxCard className='-rotate-8' speed={70} floatDuration={4.5} floatDistance={7}>
						<Image
							className='shadow-card border border-secondary-border rounded-xl w-full h-auto select-none pointer-events-none'
							src='/hero/card-2.png'
							alt='Job card'
							width={1044}
							height={664}
							draggable={false}
						/>
					</ParallaxCard>
				</motion.div>
				{/* Input — appears after cards */}
				<motion.div
					variants={item}
					className='z-20 relative bg-surface-background/20 shadow-hero-input backdrop-blur-md mx-auto -mt-20 p-3 border border-secondary-border rounded-[28px] w-full max-w-[660px]'
				>
					<HeroInput />
				</motion.div>
			</motion.div>
		</div>
	)
}
