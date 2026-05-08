"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const LOCALE_LABELS: Record<Locale, string> = {
	en: "EN",
	ar: "AR",
}

export function LocaleSwitcher({ className }: { className?: string }) {
	const locale = useLocale() as Locale
	const router = useRouter()
	const pathname = usePathname()

	const nextLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale

	function switchLocale() {
		router.replace(pathname, { locale: nextLocale })
	}

	return (
		<button
			type='button'
			onClick={switchLocale}
			className={cn(
				"flex items-center justify-center px-2.5 h-9 rounded-lg border border-overlay-bold text-sm font-medium text-primary-text hover:bg-overlay-ultra-subtle transition-colors cursor-pointer",
				className
			)}
		>
			{LOCALE_LABELS[nextLocale]}
		</button>
	)
}
