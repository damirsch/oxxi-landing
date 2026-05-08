"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useAnimation, type PanInfo } from "framer-motion"
import { IconStar } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const GAP = 16

export default function Testimonials() {
	const t = useTranslations("testimonials")
	const count = 5

	const containerRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const x = useMotionValue(0)
	const controls = useAnimation()
	const [activeIndex, setActiveIndex] = useState(0)

	const layoutRef = useRef({ cardWidth: 420, dragConstraint: 0 })

	const [sidePadding, setSidePadding] = useState(40)
	const [dragConstraintState, setDragConstraintState] = useState(0)

	const fadeStartOpacity = useTransform(x, [0, -30], [0, 1])
	const fadeEndOpacity = useTransform(x, () => {
		const { dragConstraint } = layoutRef.current
		const current = x.get()
		if (dragConstraint >= 0) return 0
		const distFromEnd = current - dragConstraint
		return Math.min(1, Math.max(0, distFromEnd / 30))
	})

	useEffect(() => {
		const el = containerRef.current
		const track = trackRef.current
		if (!el || !track) return

		const firstCard = track.firstElementChild as HTMLElement | null
		const measuredWidth = firstCard?.offsetWidth ?? 420
		const visibleWidth = el.offsetWidth
		const pad = Math.max(40, (visibleWidth - measuredWidth) / 2)
		const totalWidth = count * measuredWidth + (count - 1) * GAP + pad * 2
		const constraint = Math.min(0, -(totalWidth - visibleWidth))

		layoutRef.current = { cardWidth: measuredWidth, dragConstraint: constraint }
		setSidePadding(pad)
		setDragConstraintState(constraint)
	}, [count])

	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		let scrollTimeout: ReturnType<typeof setTimeout> | undefined

		const snapAfterScroll = () => {
			const { cardWidth, dragConstraint } = layoutRef.current
			const currentX = x.get()
			let targetIndex = Math.round(-currentX / (cardWidth + GAP))
			targetIndex = Math.max(0, Math.min(targetIndex, count - 1))
			const targetX = -(targetIndex * (cardWidth + GAP))
			const clampedX = Math.max(dragConstraint, Math.min(0, targetX))
			setActiveIndex(targetIndex)
			controls.start({ x: clampedX, transition: { type: "spring", stiffness: 200, damping: 28 } })
		}

		const onWheel = (e: WheelEvent) => {
			const { cardWidth, dragConstraint } = layoutRef.current
			const absX = Math.abs(e.deltaX)
			const absY = Math.abs(e.deltaY)

			if (absX < 5 || absY > absX * 0.7) return

			e.preventDefault()
			const dx = e.deltaX

			const currentX = x.get()
			if ((currentX >= 0 && dx < 0) || (currentX <= dragConstraint && dx > 0)) return

			controls.stop()
			const newX = Math.max(dragConstraint, Math.min(0, currentX - dx))
			x.set(newX)

			const index = Math.round(-newX / (cardWidth + GAP))
			setActiveIndex(Math.max(0, Math.min(index, count - 1)))

			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(snapAfterScroll, 120)
		}

		el.addEventListener("wheel", onWheel, { passive: false })
		return () => {
			el.removeEventListener("wheel", onWheel)
			clearTimeout(scrollTimeout)
		}
	}, [x, controls, count])

	const snapToNearest = (_: unknown, info: PanInfo) => {
		const { cardWidth, dragConstraint } = layoutRef.current
		const currentX = x.get()
		const velocity = info.velocity.x
		const clampedVelocity = Math.max(-800, Math.min(800, velocity))
		const projectedX = currentX + clampedVelocity * 0.15

		let targetIndex = Math.round(-projectedX / (cardWidth + GAP))
		targetIndex = Math.max(0, Math.min(targetIndex, count - 1))

		const targetX = -(targetIndex * (cardWidth + GAP))
		const clampedX = Math.max(dragConstraint, Math.min(0, targetX))

		setActiveIndex(targetIndex)
		controls.start({ x: clampedX, transition: { type: "spring", stiffness: 200, damping: 28 } })
	}

	const scrollTo = (index: number) => {
		const { cardWidth, dragConstraint } = layoutRef.current
		const targetX = -(index * (cardWidth + GAP))
		const clampedX = Math.max(dragConstraint, Math.min(0, targetX))
		setActiveIndex(index)
		controls.start({ x: clampedX, transition: { type: "spring", stiffness: 300, damping: 30 } })
	}

	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader title={t("title")} badgeTitle={t("badge")} badgeIcon={<IconStar />} />
			<div className='relative flex flex-col items-center gap-6 pb-10'>
				<FullWidthLine position='bottom' />

				<div ref={containerRef} className='relative w-full overflow-hidden overscroll-x-contain touch-pan-y' dir='ltr'>
					<motion.div
						style={{ opacity: fadeStartOpacity }}
						className='left-0 z-10 absolute inset-y-0 bg-linear-to-r from-primary-background to-transparent w-10 sm:w-20 pointer-events-none'
					/>
					<motion.div
						style={{ opacity: fadeEndOpacity }}
						className='right-0 z-10 absolute inset-y-0 bg-linear-to-l from-primary-background to-transparent w-10 sm:w-20 pointer-events-none'
					/>

					<motion.div
						ref={trackRef}
						drag='x'
						dragConstraints={{ left: dragConstraintState, right: 0 }}
						dragElastic={0.15}
						onDragEnd={snapToNearest}
						style={{ x, paddingLeft: sidePadding, paddingRight: sidePadding }}
						animate={controls}
						className='flex items-center gap-4 py-2 cursor-grab active:cursor-grabbing'
					>
						{Array.from({ length: count }, (_, i) => (
							<article
								key={i}
								dir='auto'
								className='flex flex-col gap-6 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-5 md:p-7 border border-secondary-border rounded-[12px] w-[340px] sm:w-[420px] h-fit shrink-0'
							>
								<p className='text-secondary-text text-sm md:text-base leading-[1.4]'>{t(`items.${i}.quote`)}</p>
								<div className='flex items-center gap-3'>
									<div className='flex justify-center items-center bg-tertiary-background/50 rounded-full size-10 md:size-11 font-semibold text-secondary-text text-sm shrink-0'>
										{t(`items.${i}.name`).charAt(0)}
									</div>
									<div className='flex flex-col gap-1 w-full'>
										<p className='text-sm md:text-base leading-[1.2]'>{t(`items.${i}.name`)}</p>
										<p className='text-[13px] text-tertiary-text md:text-sm leading-[1.2]'>
											{t(`items.${i}.role`)}, {t(`items.${i}.company`)}
										</p>
									</div>
									<div className='bg-tertiary-background/50 rounded-lg size-8 shrink-0' />
								</div>
							</article>
						))}
					</motion.div>
				</div>

				<div className='flex items-center gap-1.5'>
					{Array.from({ length: count }, (_, i) => (
						<button
							key={i}
							type='button'
							aria-label={`${i + 1}`}
							onClick={() => scrollTo(i)}
							className={cn(
								"rounded-full transition-all duration-300 cursor-pointer",
								i === activeIndex
									? "bg-secondary-text size-2.5"
									: "bg-tertiary-text/30 size-2 hover:bg-tertiary-text/50"
							)}
						/>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
