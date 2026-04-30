import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "./constants"
import { PricingFeatureRow } from "./feature-row"

export function PricingPlanCard({ plan }: { plan: PricingPlan }) {
	return (
		<div
			className={cn(
				"relative flex flex-col flex-1 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-6 border border-primary-border rounded-[16px] h-full min-h-0 transition-colors"
			)}
		>
			<div className='flex justify-between items-start mb-5'>
				<div>
					<h3 className='font-semibold text-[22px] leading-none'>{plan.name}</h3>
					<p className='mt-1.5 ml-px text-[15px] text-tertiary-text leading-[1.2]'>{plan.tagline}</p>
				</div>
				{plan.recommended ? (
					<Badge
						size='small'
						className='bg-[#000000]/5 shadow-none px-2 py-1.5 border-0 rounded-[6px] h-6 font-semibold text-secondary-text text-xs leading-none shrink-0'
					>
						<span className='opacity-80'>Full Access</span>
					</Badge>
				) : null}
			</div>

			<div className='mb-5'>
				<span className='font-bold text-3xl'>${plan.monthlyPrice}</span>
				<span className='ml-0.5 text-tertiary-text text-sm'>/month</span>
			</div>

			<a href='#' className={cn(buttonVariants({ variant: plan.ctaVariant, size: "lg" }), "w-full h-10 no-underline")}>
				{plan.ctaLabel}
			</a>

			<div className='flex flex-col flex-1 gap-3.5 mt-6'>
				{plan.features.map((feature, index) => (
					<PricingFeatureRow key={index} icon={<feature.Icon className='size-[18px]' strokeWidth={1.5} />}>
						{feature.label}
					</PricingFeatureRow>
				))}
			</div>
		</div>
	)
}
