"use client"

import { useState } from "react"
import SectionHeader from "@/components/ui/section-header"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { AnimatedTabs, TabsTrigger } from "@/components/ui/tabs"
import { PRICING_PLANS, type BillingPeriod } from "./constants"
import { PricingEnterpriseBanner } from "./enterprise-banner"
import { PricingPlanCard } from "./plan-card"
import { useTranslations } from "next-intl"

const BILLING_PERIODS: BillingPeriod[] = ["monthly", "yearly"]

export function Pricing() {
	const t = useTranslations("pricing")
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")

	return (
		<SectionWrapper id='pricing' className='flex flex-col'>
			<SectionHeader title={t("title")} description={t("description")} />
			<div className='flex flex-col items-center gap-5'>
				<AnimatedTabs
					value={billingPeriod}
					onValueChange={(value) => setBillingPeriod(value as BillingPeriod)}
					activeTabIndex={BILLING_PERIODS.findIndex((p) => p === billingPeriod)}
					totalTabs={BILLING_PERIODS.length}
					tabValues={BILLING_PERIODS}
				>
					<TabsTrigger value='monthly'>{t("toggle.monthly" as Parameters<typeof t>[0])}</TabsTrigger>
					<TabsTrigger value='yearly'>
						<span className='inline-flex items-center gap-1'>
							<span>{t("toggle.yearly" as Parameters<typeof t>[0])}</span>
							<span className='text-tertiary-text' aria-hidden>
								·
							</span>
							<span className='text-emerald-700'>{t("toggle.save" as Parameters<typeof t>[0])}</span>
						</span>
					</TabsTrigger>
				</AnimatedTabs>
				<div className='relative py-px w-full'>
					<FullWidthLine className='max-lg:hidden' position='top' />
					<FullWidthLine className='max-lg:hidden' position='bottom' />
					<BgWrapper className='relative flex flex-col gap-3 max-xl:bg-transparent max-xl:p-5 max-lg:py-0 max-xl:rounded-none max-xl:outline-none'>
						<div className='z-1 relative gap-3 grid grid-cols-1 lg:grid-cols-3'>
							{PRICING_PLANS.map((plan) => (
								<PricingPlanCard key={plan.id} plan={plan} price={plan.price[billingPeriod]} />
							))}
						</div>
						<div className='z-1 relative w-full'>
							<PricingEnterpriseBanner />
						</div>
					</BgWrapper>
				</div>
			</div>
		</SectionWrapper>
	)
}
