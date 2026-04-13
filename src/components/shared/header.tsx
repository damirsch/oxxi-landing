"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "../ui/button"
import { Logo } from "../ui/icons/logo"

const NAV_KEYS = ["features", "howItWorks", "pricing", "faq", "api"] as const

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
	features: "#features",
	howItWorks: "#how-it-works",
	pricing: "#pricing",
	faq: "#faq",
	api: "#api",
}

export function Header() {
	const [scrolled, setScrolled] = useState(false)
	const t = useTranslations("header")

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 30)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<header
			className={cn(
				"top-0 z-50 sticky bg-primary-background h-20 transition-[box-shadow,border-color] duration-300",
				scrolled ? "border-b border-tertiary-border" : "border-b border-transparent"
			)}
			style={{
				boxShadow: scrolled
					? "0 8px 24px 0 transparent"
					: "0 8px 24px 12px var(--color-primary-background)",
			}}
		>
			<div className='relative flex justify-between items-center mx-auto max-w-[1200px] h-full'>
				<Link href='/' className='flex items-center gap-2'>
					<Logo className='size-6' />
					<span className='font-bold text-primary-text text-xl leading-none tracking-tight'>OXXI</span>
				</Link>

				<nav className='hidden absolute inset-s-1/2 md:flex items-center gap-1 -translate-x-1/2 rtl:translate-x-1/2'>
					{NAV_KEYS.map((key) => (
						<a
							key={key}
							href={NAV_HREFS[key]}
							className='flex items-center px-3 h-8 text-secondary-text hover:text-primary-text text-sm tracking-[-0.01em] transition-colors'
						>
							{t(`nav.${key}`)}
						</a>
					))}
				</nav>

				<div className='flex gap-2'>
					<Button variant='secondary'>{t("login")}</Button>
					<Button variant='default'>{t("signup")}</Button>
				</div>
			</div>
		</header>
	)
}
