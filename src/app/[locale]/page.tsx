import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/shared/header"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import Hero from "@/components/sections/hero"
import { Badge } from "@/components/ui/badge"
import Partners from "@/components/sections/partners"
import SectionHeader from "@/components/ui/section-header"
import { IconHelpCircle } from "@/components/ui/icons"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1'>
				<Hero />
				<Partners />

				<SectionWrapper>
					<SectionHeader
						title='From description to hire in one place'
						description='Tell Oxxi what you need — it handles the rest'
						badgeTitle='How It Works'
						badgeIcon={<IconHelpCircle />}
					/>
				</SectionWrapper>
				<SectionWrapper className='h-40'>
					<span></span>
				</SectionWrapper>
			</main>
		</>
	)
}
