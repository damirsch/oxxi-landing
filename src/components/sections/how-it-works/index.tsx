import {
	IconArrowUp,
	IconBankNote,
	IconChartUp,
	IconCheckCircle,
	IconHelpCircle,
	IconMarkerPin,
	IconTool,
} from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/ui/section-header"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"
import Image from "next/image"

const TAG_BASE =
	"border-secondary-border text-[13px] bg-surface-background h-7 ps-2 pe-3 rounded-[8px] text-secondary-text/80"

const TAG_ICON_PROPS = {
	iconStrokeWidth: 1.2,
	iconClassName: "text-tertiary-text [&_svg]:size-[14px]",
} as const

export default function HowItWorks() {
	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader
				title='From description to hire in one place'
				description='Tell Oxxi what you need, it handles the rest'
				badgeTitle='How It Works'
				badgeIcon={<IconHelpCircle />}
			/>
			<div className='relative py-px'>
				<FullWidthLine position='top' className='max-sm:hidden' />
				<FullWidthLine position='bottom' className='max-sm:hidden' />
				<BgWrapper className='flex flex-col md:grid grid-cols-12 max-xl:bg-transparent max-xl:p-5 max-sm:py-0 max-xl:rounded-none max-xl:outline-none'>
					<Card className='col-span-12'>
						<CardHeader
							title='Describe the role'
							description={
								"Tell Oxxi what you're looking for. Skills, seniority, location, and budget. In plain language"
							}
							number='01'
						/>
						<div className='group/input min-[840px]:top-1/2 z-10 min-[840px]:absolute relative min-[840px]:inset-e-14 xl:inset-e-20 flex items-center gap-0 xl:gap-1 h-full min-[840px]:-translate-y-1/2'>
							<div className='flex flex-col items-end gap-3'>
								<Badge
									size='small'
									className={cn(
										TAG_BASE,
										"-rotate-5 relative -top-4 transition-all max-lg:hidden duration-300 group-hover/input:-rotate-2 group-hover/input:-translate-x-1 group-hover/input:-translate-y-1"
									)}
									icon={<IconTool />}
									{...TAG_ICON_PROPS}
								>
									Skills
								</Badge>
								<Badge
									size='small'
									className={cn(
										TAG_BASE,
										"rotate-5 relative top-4 transition-all max-lg:hidden duration-300 group-hover/input:rotate-2 group-hover/input:-translate-x-1 group-hover/input:translate-y-1"
									)}
									icon={<IconMarkerPin />}
									{...TAG_ICON_PROPS}
								>
									Location
								</Badge>
							</div>
							<div className='relative bg-secondary-background p-2.5 sm:p-3 md:p-4 rounded-full w-full min-[840px]:w-[350px] xl:w-[400px] overflow-hidden cursor-default'>
								<div className='-top-[10%] left-[16%] absolute bg-tertiary-text opacity-60 blur-[50px] rounded-full w-8 h-[120%] -rotate-19' />
								<div className='-top-[30%] right-0 absolute bg-tertiary-text opacity-30 blur-[60px] rounded-full w-[80px] h-[160%] -rotate-12 translate-x-1/2' />
								<div className='z-10 relative flex justify-between items-center bg-surface-background shadow-[0_4px_6px_0_rgba(0,0,0,0.04)] py-2 ps-4 pe-1.5 border border-primary-border rounded-full h-11'>
									<p className='opacity-70 text-[13px] text-tertiary-text md:text-sm'>
										Write your requirements naturally...
									</p>
									<div
										className='flex justify-center items-center rounded-full size-8 shrink-0'
										style={{
											background:
												"linear-gradient(180deg, var(--color-brand-primary) 0%, #5992F5 47%, var(--color-brand-primary) 100%)",
											boxShadow: "inset 0 0 8px rgba(255,255,255,0.5), 0 2px 12px rgba(88,145,245,0.5)",
										}}
									>
										<IconArrowUp className='size-[18px] text-white' strokeWidth={1.8} />
									</div>
								</div>
							</div>
							<div className='flex flex-col items-start gap-3'>
								<Badge
									size='small'
									className={cn(
										TAG_BASE,
										"rotate-5 relative -top-4 transition-all max-lg:hidden duration-300 group-hover/input:rotate-2 group-hover/input:translate-x-1 group-hover/input:-translate-y-1"
									)}
									icon={<IconChartUp />}
									{...TAG_ICON_PROPS}
								>
									Seniority
								</Badge>
								<Badge
									size='small'
									className={cn(
										TAG_BASE,
										"-rotate-5 relative top-4 transition-all max-lg:hidden duration-300 group-hover/input:-rotate-2 group-hover/input:translate-x-1 group-hover/input:translate-y-1"
									)}
									icon={<IconBankNote />}
									{...TAG_ICON_PROPS}
								>
									Budget
								</Badge>
							</div>
						</div>
					</Card>
					<Card className='col-span-5'>
						<CardHeader
							title='Get candidates'
							description={"Oxxi analyzes your requirements and returns matching profiles, ranked by relevance"}
							number='02'
						/>
						<div className='group/candidates flex flex-col gap-2 md:gap-3.5 mx-auto my-auto max-w-[320px] md:max-w-[unset] cursor-default'>
							<Image
								className='px-4 w-full object-bottom object-cover aspect-300/46 lg:aspect-auto pointer-events-none select-none'
								src='/how-it-works/candidates-1.png'
								alt='Candidates'
								width={540}
								height={200}
								priority
								draggable={false}
							/>
							<div
								className='z-10 relative flex justify-between gap-3 shadow-candidate-row group-hover/candidates:shadow-candidate-row-hover p-3 rounded-[12px] lg:rounded-[16px] group-hover/candidates:scale-[1.02] transition-all duration-300 ease-out'
								style={{
									background:
										"linear-gradient(102deg, var(--color-primary-text) 0%, #222223 15%, #404040 32%, #020303 57%, var(--color-primary-text) 100%)",
								}}
							>
								<Image
									src='/how-it-works/candidate-avatar.png'
									alt='avatar'
									width={40}
									height={40}
									draggable={false}
									className='size-8 lg:size-10 object-contain pointer-events-none select-none shrink-0'
								/>
								<div className='flex flex-col justify-center gap-1 w-full font-semibold'>
									<p className='text-[12px] text-white lg:text-[15px] leading-[1.1] tracking-[-0.01em]'>James Walker</p>
									<p
										className='bg-clip-text text-[11px] text-transparent lg:text-[13px] leading-[1.2] tracking-[-0.01em] whitespace-nowrap'
										style={{
											backgroundImage:
												"linear-gradient(90deg, var(--color-tertiary-text) 0%, #D4D4D4 30%, var(--color-tertiary-text) 100%)",
										}}
									>
										Marketing Manager, Germany, $70/hr
									</p>
								</div>
							</div>
							<Image
								className='px-4 object-cover object-top aspect-300/46 lg:aspect-auto pointer-events-none select-none'
								src='/how-it-works/candidates-2.png'
								alt='Candidates'
								width={540}
								height={200}
								draggable={false}
							/>
						</div>
					</Card>
					<Card className='col-span-7 md:pb-0'>
						<CardHeader
							title='Shortlist with context'
							description={"Compare candidates side by side. Salary expectations, experience, and more"}
							number='03'
						/>
						<div className='relative flex mx-auto mt-auto w-full md:w-[95%]'>
							<div className='bg-secondary-background p-2 md:p-3 lg:p-4 rounded-t-[10px] md:rounded-t-[16px] lg:rounded-t-[24px] w-full overflow-hidden'>
								<Image
									className='shadow-candidate-table object-contain pointer-events-none select-none'
									src='/how-it-works/candidates-table.png'
									alt='Candidates table'
									width={1400}
									height={900}
									draggable={false}
								/>
							</div>
							<div
								className='z-10 absolute inset-0 pointer-events-none'
								style={{
									background:
										"linear-gradient(to bottom, transparent 0%, transparent 65%, color-mix(in oklch, var(--color-surface-background) 90%, transparent) 85%, var(--color-surface-background) 100%)",
								}}
							/>
							<div className='bottom-1 lg:bottom-3 left-1/2 z-20 absolute scale-90 lg:scale-100 -translate-x-1/2'>
								<div
									className='flex items-center gap-2 bg-[#18181B] px-3.5 py-2.5 rounded-[16px] w-fit font-semibold text-white'
									style={{
										boxShadow:
											"0 22px 44px rgba(0, 0, 0, 0.14), 0 10px 20px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.06), 0 1px 0 rgba(255, 255, 255, 0.06) inset",
										background:
											"linear-gradient(102deg, var(--color-primary-text) 0%, #222223 15%, #2C2C2C 32%, #020303 57%, var(--color-primary-text) 100%)",
									}}
								>
									<IconCheckCircle className='size-4 shrink-0' />
									<span className='text-[13px] leading-none tracking-[-0.01em] whitespace-nowrap'>
										You&apos;ve viewed 10+ candidates today!
									</span>
								</div>
								<div className='top-0 left-1/2 -z-10 absolute bg-[#787777] rounded-[16px] w-[calc(100%-26px)] h-[calc(100%+5px)] -translate-x-1/2' />
								<div className='top-0 left-1/2 -z-20 absolute bg-[#B2B2B2] rounded-[16px] w-[calc(100%-54px)] h-[calc(100%+10px)] -translate-x-1/2' />
							</div>
						</div>
					</Card>
					<Card className='col-span-7'>
						<CardHeader
							title='Take action'
							description={
								"Schedule interviews, reach out to candidates, or post a job. All without leaving the conversation"
							}
							number='04'
						/>
						<div className='relative mt-auto w-full'>
							<Image
								className='max-sm:hidden w-full h-auto object-contain scale-104 origin-top-left pointer-events-none select-none'
								src='/how-it-works/candidate-card.png'
								alt='Candidate card'
								width={640}
								height={250}
								draggable={false}
							/>
							<Image
								className='sm:hidden block w-full h-auto object-contain scale-104 origin-top-left pointer-events-none select-none'
								src='/how-it-works/candidate-card-mobile.png'
								alt='Candidate card'
								width={640}
								height={220}
								draggable={false}
							/>
						</div>
					</Card>
					<Card className='max-md:gap-0 col-span-5 max-md:pb-0 overflow-hidden'>
						<CardHeader
							title='Keep hiring memory'
							description={"Every search, shortlist, and decision is saved and reused for future roles"}
							number='05'
						/>
						<div className='relative md:flex-1 w-full md:min-h-0'>
							<Image
								width={1380}
								height={920}
								sizes='(min-width: 1024px) 420px, 100vw'
								className='md:absolute md:inset-0 w-full h-auto md:h-full object-contain md:scale-125 pointer-events-none select-none'
								src='/how-it-works/context-diagram.png'
								alt='Keep hiring memory'
								draggable={false}
							/>
						</div>
					</Card>
				</BgWrapper>
			</div>
		</SectionWrapper>
	)
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				"relative flex flex-col gap-y-6 lg:gap-y-7 xl:gap-y-9 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-6 md:p-7 xl:p-9 border border-primary-border rounded-[14px] md:rounded-[16px] xl:rounded-[18px]",
				className
			)}
		>
			{children}
		</div>
	)
}

interface CardHeaderProps {
	title: string
	description: string
	number: string
}

function CardHeader({ title, description, number }: CardHeaderProps) {
	return (
		<div className='relative flex gap-2'>
			<div className='flex flex-col gap-2.5'>
				<h4 className='font-heading font-semibold text-base md:text-lg leading-[1.1] tracking-tight'>{title}</h4>
				<p className='max-w-[400px] text-tertiary-text md:text-[15px] text-sm text-balance leading-[1.45] tracking-[-0.01em] whitespace-pre-line'>
					{description}
				</p>
			</div>
			<p className='top-0 right-0 absolute opacity-60 font-semibold text-[13px] text-tertiary-text md:text-sm tracking-[-0.01em]'>
				{number}
			</p>
		</div>
	)
}
