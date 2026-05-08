import { setRequestLocale } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import { Hero, HowItWorks, KeyFeatures, OxxiMarquee, Partners, WhyOxxi, CTA, FAQ } from "@/components/sections"
import { Footer, Header, Pricing } from "@/components/shared"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1 pt-14 md:pt-20'>
				<Hero />
				<Partners />
				<HowItWorks />
				<KeyFeatures />
				<WhyOxxi />
				<OxxiMarquee />
				<Pricing />
				<CTA />
				<FAQ />
			</main>
			<Footer />
		</>
	)
}
