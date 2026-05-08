import SectionHeader from "@/components/ui/section-header"
import { BgWrapper, FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { PRICING_PLANS } from "./constants"
import { PricingEnterpriseBanner } from "./enterprise-banner"
import { PricingPlanCard } from "./plan-card"

export function Pricing() {
	return (
		<SectionWrapper className='flex flex-col'>
			<SectionHeader title='Pricing plans' description='Pick a plan that fits your hiring volume' />
			<div className='relative py-px'>
				<FullWidthLine className='max-lg:hidden' position='top' />
				<FullWidthLine className='max-lg:hidden' position='bottom' />
				<BgWrapper className='relative flex flex-col gap-3 max-xl:bg-transparent max-xl:p-5 max-lg:py-0 max-xl:rounded-none max-xl:outline-none'>
					<div className='z-1 relative gap-3 grid grid-cols-1 lg:grid-cols-3'>
						{PRICING_PLANS.map((plan) => (
							<PricingPlanCard key={plan.id} plan={plan} />
						))}
					</div>
					<div className='z-1 relative w-full'>
						<PricingEnterpriseBanner />
					</div>
				</BgWrapper>
			</div>
		</SectionWrapper>
	)
}
