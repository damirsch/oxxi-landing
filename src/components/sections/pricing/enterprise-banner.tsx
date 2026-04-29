import { buttonVariants } from "@/components/ui/button-variants"
import { IconBuilding } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { CONTACT_SALES_HREF } from "./constants"

export function PricingEnterpriseBanner() {
	return (
		<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-3 pr-4 border border-primary-border rounded-2xl w-full bg-surface-background shadow-[0_4px_60px_-8px_rgba(0,0,0,0.15)]'>
			<div className='flex items-center gap-3 min-w-0'>
				<div className='flex justify-center items-center bg-overlay-soft border-[1.5px] border-overlay-soft rounded-lg size-10 shrink-0'>
					<IconBuilding className='size-5 text-secondary-text' strokeWidth={1.3} />
				</div>
				<div className='min-w-0'>
					<h3 className='text-[15px] text-primary-text'>Enterprise</h3>
					<p className='text-tertiary-text text-sm'>High-volume hiring, custom pricing</p>
				</div>
			</div>
			<a
				href={CONTACT_SALES_HREF}
				target='_blank'
				rel='noopener noreferrer'
				className={cn(buttonVariants({ variant: "secondary" }), "w-full sm:w-auto shrink-0 rounded-full no-underline")}
			>
				Contact sales
			</a>
		</div>
	)
}
