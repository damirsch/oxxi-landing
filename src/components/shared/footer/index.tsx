import { Logo } from "@/components/ui/icons/logo"
import { FullWidthLine } from "@/components/ui/wrappers"
import Link from "next/link"

export function Footer() {
	return (
		<footer className='flex flex-col items-center bg-primary-text px-4 py-20 text-white'>
			<div className='flex gap-10 pb-20 w-full max-w-[1148px]'>
				<div className='flex flex-col gap-7 w-[290px] shrink-0'>
					<div className='flex items-center gap-2 font-bold text-[26px] leading-[1.1] tracking-tight'>
						<Logo className='size-7' />
						OXXI
					</div>
					<div className='font-semibold text-2xl leading-[1.3]'>
						<p>Your hiring</p>
						<p className='text-tertiary-text'>Infrastructure</p>
					</div>
				</div>
				<div className='flex gap-5 w-full'>
					<FooterSection
						title='Company'
						items={[
							{ name: "Home", href: "/" },
							{ name: "How it works", href: "/" },
							{ name: "Pricing", href: "/" },
							{ name: "FAQ", href: "/" },
						]}
					/>
					<FooterSection
						title='Product'
						items={[
							{ name: "Dashboard", href: "/" },
							{ name: "Chat", href: "/" },
							{ name: "API", href: "/" },
						]}
					/>
					<FooterSection
						title='Legal'
						items={[
							{ name: "Privacy Policy", href: "/" },
							{ name: "Terms of Service", href: "/" },
						]}
					/>
					<FooterSection
						title='Follow us'
						items={[
							{ name: "LinkedIn", href: "/" },
							{ name: "X / Twitter", href: "/" },
							{ name: "Instagram", href: "/" },
							{ name: "GitHub", href: "/" },
						]}
					/>
				</div>
			</div>
			<div className='relative pt-10 w-full max-w-[1148px]'>
				<FullWidthLine position='top' variant='gradient' />
				<p className='opacity-70 text-tertiary-text text-sm text-center'>© 2026 Oxxi. A Mawared Tech Company</p>
			</div>
		</footer>
	)
}

interface FooterSectionProps {
	title: string
	items: { name: string; href: string }[]
}

function FooterSection({ title, items }: FooterSectionProps) {
	return (
		<div className='flex flex-col gap-4 w-full'>
			<p className='leading-[1.2]'>{title}</p>
			{items.map((item) => (
				<FooterLink key={item.name} href={item.href}>
					{item.name}
				</FooterLink>
			))}
		</div>
	)
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className='opacity-70 hover:opacity-100 w-fit text-tertiary-text hover:text-[#d3d3d3] leading-[1.2] transition-all'
		>
			{children}
		</Link>
	)
}
