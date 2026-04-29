import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "./constants"
import { PricingFeatureRow } from "./feature-row"

export function PricingPlanCard({ plan }: { plan: PricingPlan }) {
	return (
		<div
			className={cn(
				"relative flex flex-col flex-1 bg-surface-background shadow-[0_12px_50px_-8px_rgba(0,0,0,0.04)] p-6 border rounded-[16px] h-full min-h-0 transition-colors",
				plan.recommended ? "border-brand-primary border-2" : "border-primary-border"
			)}
		>
			<div className='flex justify-between items-start mb-5'>
				<div>
					<h3 className='font-medium text-[22px] leading-none'>{plan.name}</h3>
					<p className='mt-1.5 ml-px text-[15px] text-tertiary-text leading-[1.2]'>{plan.tagline}</p>
				</div>
				{plan.recommended ? (
					<Badge
						size='small'
						className='bg-brand-light shadow-none px-2 py-0.5 border-0 rounded-[6px] h-6 font-medium text-brand-primary text-xs shrink-0'
					>
						Full Access
					</Badge>
				) : null}
			</div>

			<div className='mb-5'>
				<span className='font-semibold text-3xl'>${plan.monthlyPrice}</span>
				<span className='ml-0.5 text-tertiary-text text-sm'>/month</span>
			</div>

			<a
				href='#'
				className={cn(
					buttonVariants({ variant: plan.ctaVariant, size: "lg" }),
					"w-full h-10 rounded-full font-semibold no-underline"
				)}
			>
				{plan.ctaLabel}
			</a>

			<div className='flex flex-col flex-1 gap-4 mt-6'>
				{plan.features.map((feature, index) => (
					<PricingFeatureRow key={index} icon={<feature.Icon className='size-[18px]' strokeWidth={1.3} />}>
						{feature.label}
					</PricingFeatureRow>
				))}
			</div>
		</div>
	)
}
