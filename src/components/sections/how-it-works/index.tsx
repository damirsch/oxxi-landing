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
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
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
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				<div className='relative gap-2 grid grid-cols-12 bg-overlay-subtle p-2 rounded-[20px] outline outline-secondary-border'>
					<Card className='col-span-12'>
						<CardHeader
							title='Describe the role'
							description={
								"Tell Oxxi what you're looking for. Skills,\nseniority, location, and budget. In plain language"
							}
							number='01'
						/>
						<div className='group/input top-1/2 z-10 absolute inset-e-20 flex items-center gap-1 h-full -translate-y-1/2'>
							<div className='flex flex-col items-end gap-3'>
								<Badge
									size='small'
									className={cn(
										TAG_BASE,
										"-rotate-5 relative -top-4 transition-all duration-300 group-hover/input:-rotate-2 group-hover/input:-translate-x-1 group-hover/input:-translate-y-1"
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
										"rotate-5 relative top-4 transition-all duration-300 group-hover/input:rotate-2 group-hover/input:-translate-x-1 group-hover/input:translate-y-1"
									)}
									icon={<IconMarkerPin />}
									{...TAG_ICON_PROPS}
								>
									Location
								</Badge>
							</div>
							<div className='relative bg-secondary-background p-4 rounded-full w-[400px] overflow-hidden cursor-default'>
								<div className='-top-[10%] left-[16%] absolute bg-tertiary-text opacity-60 blur-[50px] rounded-full w-8 h-[120%] -rotate-19' />
								<div className='-top-[30%] right-0 absolute bg-tertiary-text opacity-30 blur-[60px] rounded-full w-[80px] h-[160%] -rotate-12 translate-x-1/2' />
								<div className='z-10 relative flex justify-between items-center bg-surface-background shadow-[0_4px_6px_0_rgba(0,0,0,0.04)] py-2 ps-4 pe-1.5 border border-primary-border rounded-full h-11'>
									<p className='opacity-70 text-tertiary-text text-sm'>Write your requirements naturally...</p>
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
										"rotate-5 relative -top-4 transition-all duration-300 group-hover/input:rotate-2 group-hover/input:translate-x-1 group-hover/input:-translate-y-1"
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
										"-rotate-5 relative top-4 transition-all duration-300 group-hover/input:-rotate-2 group-hover/input:translate-x-1 group-hover/input:translate-y-1"
									)}
									icon={<IconBankNote />}
									{...TAG_ICON_PROPS}
								>
									Budget
								</Badge>
							</div>
						</div>
					</Card>
					<Card className='col-span-5 sm:col-span-5 md:col-start-1 md:col-end-6'>
						<CardHeader
							title='Get candidates'
							description={"Oxxi analyzes your requirements and returns\nmatching profiles, ranked by relevance"}
							number='02'
						/>
						<div className='group/candidates flex flex-col gap-3.5 cursor-default'>
							<Image
								className='px-4 pointer-events-none select-none'
								src='/how-it-works/candidates-1.png'
								alt='Candidates'
								width={540}
								height={200}
								priority
								draggable={false}
							/>
							<div
								className='z-10 relative flex justify-between gap-3 shadow-candidate-row group-hover/candidates:shadow-candidate-row-hover p-3 rounded-[16px] group-hover/candidates:scale-[1.02] transition-all duration-300 ease-out'
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
									className='pointer-events-none select-none'
								/>
								<div className='flex flex-col justify-center gap-1 w-full font-semibold'>
									<p className='text-[15px] text-white leading-[1.1] tracking-[-0.01em]'>James Walker</p>
									<p
										className='bg-clip-text text-[13px] text-transparent leading-[1.2] tracking-[-0.01em]'
										style={{
											backgroundImage:
												"linear-gradient(90deg, var(--color-tertiary-text) 0%, #D4D4D4 30%, var(--color-tertiary-text) 100%)",
										}}
									>
										Marketing Manager, Germany, $70/hr
									</p>
								</div>
								<div className='bg-white/15 px-2 py-1 rounded-[6px] h-fit font-semibold text-[12px] text-tertiary-background leading-none tracking-tight whitespace-nowrap'>
									Best match
								</div>
							</div>
							<Image
								className='px-4 pointer-events-none select-none'
								src='/how-it-works/candidates-2.png'
								alt='Candidates'
								width={540}
								height={200}
								draggable={false}
							/>
						</div>
					</Card>
					<Card className='col-span-7 pb-0'>
						<CardHeader
							title='Shortlist with context'
							description={"Compare candidates side by side. Salary \n expectations, experience, and more"}
							number='03'
						/>
						<div className='relative flex mx-auto w-[95%]'>
							<div className='bg-secondary-background px-4 pt-4 rounded-t-[24px] w-full overflow-hidden'>
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
							<div className='bottom-3 left-1/2 z-20 absolute -translate-x-1/2'>
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
								"Schedule interviews, reach out to candidates, \n or post a job. All without leaving the conversation"
							}
							number='04'
						/>
						<div className='relative w-full min-h-[250px]'>
							<Image
								className='left-0 absolute w-auto h-full object-contain scale-104 origin-top-left pointer-events-none select-none'
								src='/how-it-works/candidate-card.png'
								alt='Take action'
								width={640}
								height={250}
								draggable={false}
							/>
						</div>
					</Card>
					<Card className='col-span-5 overflow-hidden'>
						<CardHeader
							title='Keep hiring memory'
							description={"Every search, shortlist, and decision is \n saved and reused for future roles"}
							number='05'
						/>
						<div className='relative w-full min-h-[250px]'>
							<Image
								className='absolute h-full object-contain scale-125 pointer-events-none select-none'
								src='/how-it-works/context-diagram.png'
								alt='Keep hiring memory'
								width={1380}
								height={920}
								draggable={false}
							/>
						</div>
					</Card>
				</div>
			</div>
		</SectionWrapper>
	)
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				"relative flex flex-col gap-y-9 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-9 border border-primary-border rounded-[18px]",
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
		<div className='flex gap-2'>
			<div className='flex flex-col gap-2.5 w-full'>
				<h4 className='font-heading font-semibold text-lg leading-[1.1] tracking-tight'>{title}</h4>
				<p className='text-[15px] text-tertiary-text leading-[1.45] tracking-[-0.01em] whitespace-pre-line'>
					{description}
				</p>
			</div>
			<p className='opacity-60 font-semibold text-tertiary-text text-sm tracking-[-0.01em]'>{number}</p>
		</div>
	)
}
