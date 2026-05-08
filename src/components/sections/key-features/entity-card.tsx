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
import type { FC, ReactNode } from "react"
import type { IconProps } from "@/components/ui/icons"

const META_ICON = "size-[18px] text-tertiary-text shrink-0 opacity-60"

type MetaItem = {
	icon: FC<IconProps>
	text?: string
	iconProps?: Partial<IconProps>
}

type ActionButton = {
	label: string
	variant?: "secondary" | "default"
	icon?: FC<IconProps>
	iconProps?: Partial<IconProps>
	style?: React.CSSProperties
}

interface EntityCardProps {
	headerIcon?: ReactNode
	headerTitle: string
	headerBadge?: string
	sectionTitle?: string
	description: string
	meta?: MetaItem[]
	actions: ActionButton[]
	className?: string
}

export function EntityCard({
	headerIcon,
	headerTitle,
	headerBadge,
	sectionTitle,
	description,
	meta,
	actions,
	className,
}: EntityCardProps) {
	return (
		<div
			className={cn(
				"bg-surface-background border border-primary-border rounded-[12px] lg:rounded-[14px] overflow-hidden shrink-0",
				className
			)}
		>
			<div className='flex justify-between items-center gap-2 p-3 max-lg:px-3.5 border-secondary-border border-b'>
				<div className='flex flex-1 items-center gap-2.5 min-w-0'>
					{headerIcon}
					<span className='font-semibold text-[13px] lg:text-sm truncate leading-[1.2]'>{headerTitle}</span>
					{headerBadge && (
						<span className='bg-overlay-soft px-2 py-1 rounded-full font-semibold text-secondary-text text-xs leading-none shrink-0'>
							{headerBadge}
						</span>
					)}
				</div>
				<IconChevronUp className='size-5 text-tertiary-text shrink-0' />
			</div>

			<div>
				<div className='px-3.5 lg:px-3 pt-3 lg:pt-[10px] pb-3.5 lg:pb-3'>
					{sectionTitle && <h3 className='font-semibold text-[13px] lg:text-[15px]'>{sectionTitle}</h3>}
					<p className={cn("text-secondary-text text-xs lg:text-sm", sectionTitle && "mt-1.5")}>{description}</p>

					{meta && meta.some((m) => m.text) && (
						<div className='max-lg:hidden flex flex-wrap items-center gap-4 mt-2 pt-1 pb-0.5 text-tertiary-text'>
							{meta.map(
								({ icon: Icon, text, iconProps }) =>
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
					{actions.map((action) => (
						<Button
							key={action.label}
							variant={action.variant ?? "default"}
							className='max-lg:px-2.5 max-lg:h-8 font-semibold max-lg:text-xs'
							style={action.style}
						>
							{action.icon && <action.icon className='max-lg:hidden' {...action.iconProps} />}
							{action.label}
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}

const DARK_GRADIENT_STYLE = {
	background:
		"linear-gradient(102deg, var(--color-primary-text) 0%, #222223 15%, #404040 32%, #020303 57%, var(--color-primary-text) 100%)",
} as const

interface CandidatePreviewCardProps {
	name: string
	title: string
	description: string
	location?: string
	rate?: string
	experience?: string
	viewProfileLabel: string
	scheduleLabel: string
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
	viewProfileLabel,
	scheduleLabel,
	src,
	className,
}: CandidatePreviewCardProps) {
	return (
		<EntityCard
			headerIcon={
				src ? <Image src={src} alt={name} className='rounded-[5px] size-5 shrink-0' width={18} height={18} /> : undefined
			}
			headerTitle={name}
			sectionTitle={title}
			description={description}
			meta={[
				{ icon: IconMarkerPin, text: location, iconProps: { strokeWidth: 1.2 } },
				{ icon: IconBanknote, text: rate },
				{ icon: IconHourGlass, text: experience },
			]}
			actions={[
				{ label: viewProfileLabel, variant: "secondary" },
				{ label: scheduleLabel, icon: IconCalendar, iconProps: { strokeWidth: 1.5 }, style: DARK_GRADIENT_STYLE },
			]}
			className={className}
		/>
	)
}

interface JobPostingCardProps {
	title: string
	sectionTitle: string
	description: string
	location?: string
	salary?: string
	type?: string
	badge?: string
	previewLabel: string
	postJobLabel: string
	className?: string
}

export function JobPostingCard({
	title,
	sectionTitle,
	description,
	location,
	salary,
	type,
	badge,
	previewLabel,
	postJobLabel,
	className,
}: JobPostingCardProps) {
	return (
		<EntityCard
			headerIcon={<IconJob className='size-5 text-job-primary shrink-0' />}
			headerTitle={title}
			headerBadge={badge}
			sectionTitle={sectionTitle}
			description={description}
			meta={[
				{ icon: IconMarkerPin, text: location, iconProps: { strokeWidth: 1.2 } },
				{ icon: IconBanknote, text: salary },
				{ icon: IconClock, text: type },
			]}
			actions={[
				{ label: previewLabel, variant: "secondary" },
				{ label: postJobLabel, style: DARK_GRADIENT_STYLE },
			]}
			className={className}
		/>
	)
}
