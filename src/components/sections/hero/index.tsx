import { FullWidthLine, HatchedPattern, SectionWrapper } from "@/components/ui/wrappers"
import { HeroShowcase } from "./showcase"
import { Badge } from "@/components/ui/badge"
import { IconAnnouncement, IconCalendarCheck, IconSearch } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

export default function Hero() {
	return (
		<SectionWrapper className='relative pt-[60px]'>
			<article className='flex flex-col gap-y-9'>
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
								iconClassName='text-tertiary-text'
							>
								Search
							</Badge>
							,
							<Badge
								className='group-hover/badges:bg-surface-background -me-1 ps-1.5 w-fit group-hover/badges:rotate-2 transition-all duration-300'
								size='small'
								icon={<IconAnnouncement />}
								iconClassName='text-tertiary-text'
							>
								Distribution
							</Badge>
							, and
							<Badge
								className='group-hover/badges:bg-surface-background ps-1.5 w-fit group-hover/badges:rotate-2 transition-all duration-300'
								size='small'
								icon={<IconCalendarCheck />}
								iconClassName='text-tertiary-text'
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
			</article>
			<HeroShowcase />
		</SectionWrapper>
	)
}
