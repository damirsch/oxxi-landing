import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/shared/header"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import { Hero, HowItWorks, KeyFeatures, OxxiMarquee, Partners, Pricing, WhyOxxi, CTA, FAQ } from "@/components/sections"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1'>
				<Hero />
				<Partners />
				<HowItWorks />
				<KeyFeatures />
				<WhyOxxi />
				<OxxiMarquee />
				<Pricing />
				<CTA />
				<FAQ />
				<SectionWrapper className='h-40'>
					<span></span>
				</SectionWrapper>
			</main>
		</>
	)
}
