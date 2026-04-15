import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/shared/header"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import Hero from "@/components/sections/hero"
import Partners from "@/components/sections/partners"
import HowItWorks from "@/components/sections/how-it-works"

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
				<SectionWrapper className='h-40'>
					<span></span>
				</SectionWrapper>
			</main>
		</>
	)
}
