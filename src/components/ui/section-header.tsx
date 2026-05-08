import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface SectionHeaderProps {
	className?: string
	title: string
	description?: string
	badgeTitle?: string
	badgeIcon?: React.ReactNode
}

const SectionHeader = ({ className, title, description, badgeTitle, badgeIcon }: SectionHeaderProps) => {
	return (
		<article className={cn("flex flex-col items-center gap-5 md:gap-6 px-5 text-center", className)}>
			{(badgeTitle || badgeIcon) && (
				<Badge className='max-sm:text-[13px]' icon={badgeIcon}>
					{badgeTitle}
				</Badge>
			)}
			<div className='space-y-2 sm:space-y-3'>
				<h3 className='font-heading font-semibold text-[26px] md:text-[32px] xl:text-[38px] text-balance leading-[1.1] tracking-tight whitespace-pre-line'>
					{title}
				</h3>
				{description && (
					<p className='font-semibold text-[15px] text-tertiary-text xl:text-[22px] md:text-lg leading-[1.4] tracking-[-0.01em] whitespace-pre-line'>
						{description}
					</p>
				)}
			</div>
		</article>
	)
}

export default SectionHeader
