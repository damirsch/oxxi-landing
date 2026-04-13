import { setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { SectionWrapper } from "@/components/ui/wrappers"
import type { Locale } from "@/i18n/routing"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale as Locale)

	return (
		<>
			<Header />
			<main className='flex-1'>
				<SectionWrapper>
					<HeroPlaceholder />
				</SectionWrapper>
			</main>
			<Footer />
		</>
	)
}

function HeroPlaceholder() {
	const t = useTranslations("hero")

	return (
		<div className='flex flex-col justify-center items-center gap-4 px-6 min-h-[80vh]'>
			<h1 className='font-bold text-primary-text text-4xl text-center'>{t("title")}</h1>
			<p className='text-secondary-text text-lg text-center'>{t("subtitle")}</p>
		</div>
	)
}
