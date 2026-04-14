import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/shared/header"
import { SectionWrapper, HatchedPattern, FullWidthLine } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import { Badge } from "@/components/ui/badge"
import { IconAnnouncement, IconCalendarCheck, IconSearch } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { ParallaxCard } from "@/components/ui/parallax-card"
import Image from "next/image"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1'>
				<SectionWrapper className='flex flex-col gap-y-9 pt-[60px]'>
					<div className='flex flex-col items-center gap-3 text-center'>
						<Badge>
							<div
								className='bg-[linear-gradient(135deg,#5C69F6_-55%,#48B0EC_50%,#8DDFFF_100%)] rounded-full size-2 shrink-0'
								aria-hidden
							/>
							Headhunting on autopilot
						</Badge>
						<h1 className='font-heading font-semibold text-[58px] leading-[1.1] tracking-tight'>
							Oxxi. Your Hiring
							<br />
							<span className='text-tertiary-text'>Infrastructure</span>
						</h1>
						<div className='flex flex-col items-center gap-1 text-tertiary-text text-base tracking-[-0.01em] cursor-default'>
							<p>Replace your spreadsheets and manual hiring workflows with</p>
							<div className='group/badges flex items-center gap-1.5'>
								built-in{" "}
								<Badge
									className='group-hover/badges:bg-surface-background -me-1 ps-1.5 w-fit group-hover/badges:-rotate-2 transition-all duration-300'
									size='small'
									icon={<IconSearch />}
								>
									Search
								</Badge>
								,
								<Badge
									className='group-hover/badges:bg-surface-background -me-1 ps-1.5 w-fit group-hover/badges:rotate-2 transition-all duration-300'
									size='small'
									icon={<IconAnnouncement />}
								>
									Distribution
								</Badge>
								, and
								<Badge
									className='group-hover/badges:bg-surface-background ps-1.5 w-fit group-hover/badges:rotate-2 transition-all duration-300'
									size='small'
									icon={<IconCalendarCheck />}
								>
									Scheduling
								</Badge>
							</div>
						</div>
					</div>
					<div className='relative flex flex-col items-center gap-y-3 w-full h-[120px]'>
						<div className='top-[22px] absolute inset-0'>
							<FullWidthLine position='top' />
							<FullWidthLine position='bottom' />
							<HatchedPattern />
						</div>
						<div className='z-10 relative flex gap-3'>
							<Button
								className='bg-surface-background hover:bg-[#fbfbfb] shadow-[0_4px_6px_0_rgba(0,0,0,0.04)] px-5 h-11 text-[15px]'
								variant='secondary'
							>
								See how it works
							</Button>
							<Button className='px-5 h-11 text-[15px]'>Start for free</Button>
						</div>
					</div>
				</SectionWrapper>
				<SectionWrapper className='z-10 relative overflow-visible'>
					<div className='relative'>
						<ParallaxCard
							className='top-[34%] -left-[8%] z-20 absolute w-[33%] -rotate-8'
							speed={60}
							floatDuration={4.5}
							floatDistance={6}
						>
							<Image
								className='shadow-card border border-secondary-border rounded-xl w-full h-auto'
								src='/hero/card-2.png'
								alt='Job card'
								width={1044}
								height={664}
							/>
						</ParallaxCard>

						<ParallaxCard
							className='top-[18%] -right-[12%] z-20 absolute w-[26%] rotate-8'
							speed={40}
							floatDuration={3.5}
							floatDistance={4}
						>
							<Image
								className='shadow-card border border-secondary-border rounded-xl w-full h-auto'
								src='/hero/card-1.png'
								alt='Sidebar'
								width={903}
								height={498}
							/>
						</ParallaxCard>

						<Image
							className='rounded-[16px] rounded-b-none w-full h-auto'
							src='/hero/product.png'
							alt='Product'
							width={1200}
							height={636}
							priority
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
				</SectionWrapper>
				<SectionWrapper className='h-[200px]'>
					<span></span>
				</SectionWrapper>
			</main>
		</>
	)
}
