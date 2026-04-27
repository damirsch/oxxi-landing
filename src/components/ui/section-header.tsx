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
		<article className={cn("flex flex-col items-center gap-6 text-center", className)}>
			{(badgeTitle || badgeIcon) && <Badge icon={badgeIcon}>{badgeTitle}</Badge>}
			<div className='space-y-3'>
				<h3 className='font-heading font-semibold text-[38px] leading-[1.1] tracking-tight whitespace-pre-line'>{title}</h3>
				{description && (
					<p className='font-semibold text-tertiary-text text-2xl leading-[1.2] tracking-[-0.01em]'>{description}</p>
				)}
			</div>
		</article>
	)
}

export default SectionHeader
