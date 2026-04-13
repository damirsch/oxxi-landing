import type { Metadata } from "next"
import { Inter, Geist, Noto_Sans_Arabic } from "next/font/google"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { routing, RTL_LOCALES, type Locale } from "@/i18n/routing"
import "../globals.css"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
})

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
	display: "swap",
})

const notoArabic = Noto_Sans_Arabic({
	variable: "--font-arabic",
	subsets: ["arabic"],
	display: "swap",
})

export const metadata: Metadata = {
	title: "Oxxi",
	description: "Oxxi — AI-powered hiring platform",
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale: rawLocale } = await params

	if (!routing.locales.includes(rawLocale as Locale)) {
		notFound()
	}

	const locale = rawLocale as Locale
	setRequestLocale(locale)

	const isRtl = RTL_LOCALES.includes(locale)
	const dir = isRtl ? "rtl" : "ltr"
	const fontClass = isRtl
		? `${notoArabic.variable} ${inter.variable} ${geist.variable}`
		: `${inter.variable} ${geist.variable}`

	const messages = await getMessages()

	return (
		<html lang={locale} dir={dir} className={`${fontClass} antialiased`}>
			<body className='flex flex-col min-h-screen font-medium'>
				<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
			</body>
		</html>
	)
}
