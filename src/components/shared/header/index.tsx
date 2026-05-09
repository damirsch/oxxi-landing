"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "../../ui/button"
import { Logo } from "../../ui/icons/logo"
import { LocaleSwitcher } from "./locale-switcher"

const NAV_KEYS = ["features", "howItWorks", "pricing", "faq", "api"] as const

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
	features: "#features",
	howItWorks: "#how-it-works",
	pricing: "#pricing",
	faq: "#faq",
	api: "#api",
}

function BurgerIcon({ open }: { open: boolean }) {
	return (
		<div className='relative flex flex-col justify-center items-center size-5'>
			<span
				className={cn(
					"right-0 left-0 absolute bg-primary-text rounded-full h-[1.5px] transition-all duration-300 ease-in-out",
					open ? "top-[10px] rotate-45" : "top-[3px] rotate-0"
				)}
			/>
			<span
				className={cn(
					"right-0 left-0 absolute bg-primary-text rounded-full h-[1.5px] transition-all duration-300 ease-in-out",
					open ? "opacity-0 scale-x-0" : "top-[9.25px] opacity-100 scale-x-100"
				)}
			/>
			<span
				className={cn(
					"right-0 left-0 absolute bg-primary-text rounded-full h-[1.5px] transition-all duration-300 ease-in-out",
					open ? "top-[10px] -rotate-45" : "top-[15.5px] rotate-0"
				)}
			/>
		</div>
	)
}

export function Header() {
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const scrollLockY = useRef(0)
	const t = useTranslations("header")

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 0)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useEffect(() => {
		if (!menuOpen) return
		const html = document.documentElement
		const body = document.body
		scrollLockY.current = window.scrollY
		html.style.overflow = "hidden"
		body.style.overflow = "hidden"
		body.style.position = "fixed"
		body.style.top = `-${scrollLockY.current}px`
		body.style.left = "0"
		body.style.right = "0"
		body.style.width = "100%"
		return () => {
			const y = scrollLockY.current
			html.style.overflow = ""
			body.style.overflow = ""
			body.style.position = ""
			body.style.top = ""
			body.style.left = ""
			body.style.right = ""
			body.style.width = ""
			// Global `html { scroll-behavior: smooth }` would animate this scroll from 0 → y.
			const prevScrollBehavior = html.style.scrollBehavior
			html.style.scrollBehavior = "auto"
			window.scrollTo(0, y)
			html.style.scrollBehavior = prevScrollBehavior
		}
	}, [menuOpen])

	const closeMenu = useCallback(() => setMenuOpen(false), [])

	return (
		<>
			<header
				className={cn(
					"top-0 right-0 left-0 z-50 fixed bg-primary-background h-14 md:h-20 transition-[box-shadow,border-color] duration-300",
					scrolled ? "border-b border-tertiary-border" : "border-b border-tertiary-border md:border-transparent"
				)}
				style={{
					boxShadow: scrolled ? "0 8px 24px 0 transparent" : "0 8px 24px 12px var(--color-primary-background)",
				}}
			>
				<div className='relative flex justify-between items-center mx-auto px-5 xl:px-2 max-w-[1200px] h-full'>
					<Link href='/' className='flex items-center gap-2'>
						<Logo className='size-5 md:size-6' />
						<span className='font-bold text-primary-text text-lg md:text-xl leading-none tracking-tight'>OXXI</span>
					</Link>

					<nav className='hidden absolute inset-s-1/2 lg:flex items-center gap-1 -translate-x-1/2 rtl:translate-x-1/2'>
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

					<div className='hidden lg:flex gap-2'>
						<LocaleSwitcher />
						<Button variant='secondary' href='https://app.oxxi.com/login'>
							{t("login")}
						</Button>
						<Button variant='default' href='https://app.oxxi.com/signup'>
							{t("signup")}
						</Button>
					</div>

					<div className='lg:hidden flex items-center gap-1'>
						<LocaleSwitcher />
						<button
							type='button'
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							className='flex justify-center items-center size-10 cursor-pointer'
							onClick={() => setMenuOpen((v) => !v)}
						>
							<BurgerIcon open={menuOpen} />
						</button>
					</div>
				</div>
			</header>

			<div
				className={cn(
					"lg:hidden top-14 md:top-20 right-0 bottom-0 left-0 z-50 fixed flex flex-col justify-between bg-primary-background transition-transform duration-300 ease-in-out",
					menuOpen ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
				)}
			>
				<nav className='flex flex-col py-2'>
					{NAV_KEYS.map((key) => (
						<a
							key={key}
							href={NAV_HREFS[key]}
							onClick={closeMenu}
							className='px-4 py-2 text-primary-text text-sm tracking-[-0.01em] transition-colors'
						>
							{t(`nav.${key}`)}
						</a>
					))}
				</nav>
				<div className='flex flex-col gap-3 px-4 pb-4'>
					<div className='flex gap-2'>
						<Button variant='secondary' className='w-full h-10' href='https://app.oxxi.com/login' onClick={closeMenu}>
							{t("login")}
						</Button>
						<Button variant='default' className='w-full h-10' href='https://app.oxxi.com/signup' onClick={closeMenu}>
							{t("signup")}
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
