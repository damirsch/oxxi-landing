"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { IconStar } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const ITEM_COUNT = 5

export default function Testimonials() {
	const t = useTranslations("testimonials")

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			startIndex: Math.floor(ITEM_COUNT / 2),
			dragFree: false,
			containScroll: false,
		},
		[WheelGesturesPlugin({ forceWheelAxis: "x" })]
	)

	const [activeIndex, setActiveIndex] = useState(Math.floor(ITEM_COUNT / 2))

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setActiveIndex(emblaApi.selectedScrollSnap())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return
		emblaApi.on("select", onSelect)
		return () => {
			emblaApi.off("select", onSelect)
		}
	}, [emblaApi, onSelect])

	const scrollTo = useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
		},
		[emblaApi]
	)

	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader title={t("title")} badgeTitle={t("badge")} badgeIcon={<IconStar />} />
			<div className='relative flex flex-col items-center gap-6 pb-10'>
				<FullWidthLine position='bottom' />

				<div className='relative w-full'>
					<div className='left-0 z-10 absolute inset-y-0 bg-linear-to-r from-primary-background to-transparent w-10 sm:w-20 pointer-events-none' />
					<div className='right-0 z-10 absolute inset-y-0 bg-linear-to-l from-primary-background to-transparent w-10 sm:w-20 pointer-events-none' />

					<div
						ref={emblaRef}
						className='overflow-hidden cursor-grab active:cursor-grabbing select-none'
						dir='ltr'
					>
						<div className='flex items-center -ml-4'>
							{Array.from({ length: ITEM_COUNT }, (_, i) => (
								<div key={i} className='box-content flex-[0_0_340px] sm:flex-[0_0_420px] pl-4 min-w-0 h-fit'>
									<article
										dir='auto'
										className='flex flex-col gap-6 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-5 md:p-7 border border-secondary-border rounded-[12px] h-fit'
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
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='flex items-center gap-1.5'>
					{Array.from({ length: ITEM_COUNT }, (_, i) => (
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
