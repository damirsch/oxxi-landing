import {
	IconBanknote,
	IconCalendar,
	IconChevronUp,
	IconClock,
	IconHourGlass,
	IconJob,
	IconMarkerPin,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const META_ICON = "size-[18px] text-tertiary-text shrink-0 opacity-60"

interface CandidatePreviewCardProps {
	name: string
	title: string
	description: string
	location?: string
	rate?: string
	experience?: string
	className?: string
	src?: string
}

export function CandidatePreviewCard({
	name,
	title,
	description,
	location,
	rate,
	experience,
	src,
	className,
}: CandidatePreviewCardProps) {
	return (
		<div
			className={cn(
				"bg-surface-background border border-primary-border rounded-[14px] overflow-hidden shrink-0",
				className
			)}
		>
			<div className='flex justify-between items-center gap-2 p-3 border-secondary-border border-b'>
				<div className='flex flex-1 items-center gap-2.5 min-w-0'>
					{src && <Image src={src} alt={name} className='rounded-[5px] size-5 shrink-0' width={18} height={18} />}
					<span className='font-semibold text-sm truncate leading-[1.2]'>{name}</span>
				</div>
				<IconChevronUp className='size-5 text-secondary-text shrink-0' />
			</div>

			<div>
				<div className='px-3 pt-[10px] pb-3'>
					<h3 className='font-semibold text-[15px]'>{title}</h3>
					<p className='mt-1.5 text-secondary-text text-sm'>{description}</p>

					{(location || rate || experience) && (
						<div className='flex flex-wrap items-center gap-4 mt-2 pt-1 pb-0.5 text-tertiary-text'>
							{(
								[
									[IconMarkerPin, location, { strokeWidth: 1.2 }],
									[IconBanknote, rate],
									[IconHourGlass, experience],
								] as const
							).map(
								([Icon, text, iconProps]) =>
									text && (
										<span key={text} className='flex items-center gap-1.5'>
											<Icon className={META_ICON} {...iconProps} />
											<span className='text-[13px] text-secondary-text leading-none'>{text}</span>
										</span>
									)
							)}
						</div>
					)}
				</div>
				<div className='flex justify-end gap-2 p-3 border-secondary-border border-t'>
					<Button variant='secondary'>View full profile</Button>
					<Button
						style={{
							background:
								"linear-gradient(102deg, var(--color-primary-text) 0%, #222223 15%, #404040 32%, #020303 57%, var(--color-primary-text) 100%)",
						}}
						className='font-semibold'
					>
						<IconCalendar strokeWidth={1.5} />
						Schedule an interview
					</Button>
				</div>
			</div>
		</div>
	)
}

interface JobPostingCardProps {
	title: string
	sectionTitle: string
	description: string
	location?: string
	salary?: string
	type?: string
	className?: string
}

export function JobPostingCard({
	title,
	sectionTitle,
	description,
	location,
	salary,
	type,
	className,
}: JobPostingCardProps) {
	return (
		<div
			className={cn(
				"bg-surface-background border border-primary-border rounded-[14px] overflow-hidden shrink-0",
				className
			)}
		>
			<div className='flex justify-between items-center gap-2 p-3 border-secondary-border border-b'>
				<div className='flex flex-1 items-center gap-2.5 min-w-0'>
					<IconJob className='size-5 text-job-primary shrink-0' />
					<span className='font-semibold text-sm truncate leading-[1.2]'>{title}</span>
					<span className='bg-overlay-soft px-2 py-1 rounded-full font-semibold text-secondary-text text-xs leading-none shrink-0'>
						Draft
					</span>
				</div>
				<IconChevronUp className='size-5 text-secondary-text shrink-0' />
			</div>

			<div>
				<div className='px-3 pt-[10px] pb-3'>
					<h3 className='font-semibold text-[15px]'>{sectionTitle}</h3>
					<p className='mt-1.5 text-secondary-text text-sm'>{description}</p>

					{(location || salary || type) && (
						<div className='flex flex-wrap items-center gap-4 mt-2 pt-1 pb-0.5 text-tertiary-text'>
							{(
								[
									[IconMarkerPin, location, { strokeWidth: 1.2 }],
									[IconBanknote, salary],
									[IconClock, type],
								] as const
							).map(
								([Icon, text, iconProps]) =>
									text && (
										<span key={text} className='flex items-center gap-1.5'>
											<Icon className={META_ICON} {...iconProps} />
											<span className='text-[13px] text-secondary-text leading-none'>{text}</span>
										</span>
									)
							)}
						</div>
					)}
				</div>
				<div className='flex justify-end gap-2 p-3 border-secondary-border border-t'>
					<Button variant='secondary'>Preview</Button>
					<Button
						style={{
							background:
								"linear-gradient(102deg, var(--color-primary-text) 0%, #222223 15%, #404040 32%, #020303 57%, var(--color-primary-text) 100%)",
						}}
						className='font-semibold'
					>
						Post a job
					</Button>
				</div>
			</div>
		</div>
	)
}
