import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/shared/header"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"
import Hero from "@/components/sections/hero"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1'>
				<Hero />
				<SectionWrapper className='h-[200px]'>
					<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
						Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
					</p>
				</SectionWrapper>
			</main>
		</>
	)
}
