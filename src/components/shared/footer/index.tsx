import { Logo } from "@/components/ui/icons/logo"
import { FullWidthLine } from "@/components/ui/wrappers"
import { getTranslations } from "next-intl/server"

export async function Footer() {
	const t = await getTranslations("footer")

	return (
		<footer className='flex flex-col items-center bg-primary-text px-5 xl:px-4 py-8 sm:py-10 lg:py-20 text-white'>
			<div className='flex lg:flex-row flex-col gap-10 pb-10 lg:pb-20 w-full max-w-[1148px]'>
				<div className='flex flex-col gap-5 lg:gap-7 lg:w-[230px] xl:w-[290px] shrink-0'>
					<div className='flex items-center gap-2 font-bold lg:text-[26px] text-xl leading-[1.1] tracking-tight'>
						<Logo className='size-6 lg:size-7' />
						OXXI
					</div>
					<div className='font-semibold text-xl lg:text-2xl leading-[1.3]'>
						<p>{t("tagline")}</p>
						<p className='text-tertiary-text'>{t("taglineHighlight")}</p>
					</div>
				</div>
				<div className='gap-x-5 gap-y-10 grid grid-cols-2 sm:grid-cols-4 w-full'>
					<FooterSection
						title={t("company.title")}
						items={[
							{ name: t("company.home"), href: "#" },
							{ name: t("company.howItWorks"), href: "#how-it-works" },
							{ name: t("company.pricing"), href: "#pricing" },
							{ name: t("company.faq"), href: "#faq" },
						]}
					/>
					<FooterSection
						title={t("product.title")}
						items={[
							{ name: t("product.dashboard"), href: "https://app.oxxi.com" },
							{ name: t("product.chat"), href: "https://app.oxxi.com" },
							{ name: t("product.api"), href: "#api" },
						]}
					/>
					<FooterSection
						title={t("legal.title")}
						items={[
							{ name: t("legal.privacy"), href: "#" },
							{ name: t("legal.terms"), href: "#" },
						]}
					/>
					<FooterSection
						title={t("social.title")}
						items={[
							{ name: t("social.linkedin"), href: "#" },
							{ name: t("social.twitter"), href: "#" },
							{ name: t("social.instagram"), href: "#" },
							{ name: t("social.github"), href: "#" },
						]}
					/>
				</div>
			</div>
			<div className='relative pt-6 lg:pt-10 w-full max-w-[1148px]'>
				<FullWidthLine position='top' variant='gradient' />
				<p className='opacity-70 text-[13px] text-tertiary-text md:text-sm text-center'>{t("copyright")}</p>
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
		<div className='flex flex-col gap-4 w-full text-sm lg:text-base'>
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
		<a
			href={href}
			className='opacity-70 hover:opacity-100 w-fit text-tertiary-text hover:text-[#d3d3d3] leading-[1.2] transition-all'
		>
			{children}
		</a>
	)
}
