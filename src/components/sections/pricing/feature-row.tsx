import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PricingFeatureRow({ icon, children, className }: { icon: ReactNode; children: ReactNode; className?: string }) {
	return (
		<div className={cn("flex items-center gap-2.5 text-secondary-text text-sm", className)}>
			<span className='size-[18px] [&>svg]:size-[18px] shrink-0'>{icon}</span>
			<span className='leading-none'>{children}</span>
		</div>
	)
}
