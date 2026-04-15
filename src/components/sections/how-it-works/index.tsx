import { IconArrowUp, IconHelpCircle } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"

const TAG_BASE = "border-secondary-border text-[13px] bg-surface-background h-6 text-secondary-text/80"

export default function HowItWorks() {
	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader
				title='From description to hire in one place'
				description='Tell Oxxi what you need — it handles the rest'
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
								"Tell Oxxi what you're looking for — skills,\nseniority, location, and budget. Just plain language"
							}
							number='01'
						/>
						<div className='top-1/2 z-10 absolute inset-e-20 flex items-center gap-1 -translate-y-1/2'>
							<div className='flex flex-col items-end gap-3'>
								<Badge size='small' className={cn(TAG_BASE, "-rotate-6 relative -top-4")}>
									Skills
								</Badge>
								<Badge size='small' className={cn(TAG_BASE, "rotate-6 relative top-4")}>
									Location
								</Badge>
							</div>
							<div className='relative bg-secondary-background p-4 rounded-full w-[400px] overflow-hidden'>
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
								<Badge size='small' className={cn(TAG_BASE, "rotate-3 relative -top-4")}>
									Seniority
								</Badge>
								<Badge size='small' className={cn(TAG_BASE, "-rotate-3 relative top-4")}>
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
					</Card>
					<Card className='col-span-7'>
						<CardHeader
							title='Shortlist with context'
							description={
								"Compare candidates side by side. Salary expectations,\nexperience, and more — all in one view"
							}
							number='03'
						/>
					</Card>
					<Card className='col-span-7'>
						<CardHeader
							title='Take action'
							description={
								"Schedule interviews, reach out to candidates,\nor post a job. All without leaving the conversation"
							}
							number='04'
						/>
					</Card>
					<Card className='col-span-5'>
						<CardHeader
							title='Keep hiring memory'
							description={"Every search, conversation, and decision stays\nstored and reusable across future roles"}
							number='05'
						/>
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
				"relative bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-9 border border-primary-border rounded-[18px]",
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
