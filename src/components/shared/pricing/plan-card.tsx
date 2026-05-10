"use client"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "./constants"
import { PricingFeatureRow } from "./feature-row"
import { useTranslations } from "next-intl"

export function PricingPlanCard({ plan, price }: { plan: PricingPlan; price: number }) {
	const t = useTranslations("pricing")

	const planKey = `plans.${plan.id}` as const
	const name = t(`${planKey}.name` as Parameters<typeof t>[0])
	const tagline = t(`${planKey}.tagline` as Parameters<typeof t>[0])
	const cta = t(`${planKey}.cta` as Parameters<typeof t>[0])
	const features: string[] = plan.featureIcons.map((_, i) =>
		t(`${planKey}.features.${i}` as Parameters<typeof t>[0])
	)

	return (
		<div
			className={cn(
				"relative flex flex-col flex-1 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-5 lg:p-6 border border-primary-border rounded-[16px] h-full min-h-0 transition-colors"
			)}
		>
			<div className='flex justify-between items-start mb-5'>
				<div>
					<h3 className='font-semibold sm:text-[22px] text-xl leading-none'>{name}</h3>
					<p className='mt-1.5 ms-px text-[15px] text-tertiary-text leading-[1.2]'>{tagline}</p>
				</div>
				{plan.recommended ? (
					<Badge
						size='small'
						className='bg-[#000000]/5 shadow-none px-2 py-1.5 border-0 rounded-[6px] h-6 font-semibold text-secondary-text text-xs leading-none shrink-0'
					>
						<span className='opacity-80'>{t("fullAccess")}</span>
					</Badge>
				) : null}
			</div>

			<div className='mb-5'>
				<span className='font-bold text-3xl'>
					<AnimatedCounter value={price} prefix='$' />
				</span>
				<span className='ms-0.5 text-tertiary-text text-sm'>{t("perMonth")}</span>
			</div>

			<a
				href='https://app.oxxi.com/signup'
				className={cn(buttonVariants({ variant: plan.ctaVariant, size: "lg" }), "w-full h-10 no-underline")}
			>
				{cta}
			</a>

			<div className='flex flex-col flex-1 gap-3.5 mt-6'>
				{plan.featureIcons.map((Icon, index) => (
					<PricingFeatureRow key={index} icon={<Icon className='size-[18px]' strokeWidth={1.5} />}>
						{features[index]}
					</PricingFeatureRow>
				))}
			</div>
		</div>
	)
}
