import { buttonVariants } from "@/components/ui/button-variants"
import { IconBuilding } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { CONTACT_SALES_HREF } from "./constants"
import { getTranslations } from "next-intl/server"

export async function PricingEnterpriseBanner() {
	const t = await getTranslations("pricing.enterprise")

	return (
		<div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 bg-surface-background shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] p-3 pe-4 border border-primary-border rounded-[16px] w-full'>
			<div className='flex items-center gap-3 min-w-0'>
				<div className='flex justify-center items-center bg-[#000000]/5 border-[#000000]/5 border-[1.5px] rounded-lg size-10 shrink-0'>
					<IconBuilding className='size-5 text-secondary-text' strokeWidth={1.7} />
				</div>
				<div className='min-w-0'>
					<h3 className='text-[15px] text-primary-text'>{t("title")}</h3>
					<p className='text-tertiary-text text-sm'>{t("description")}</p>
				</div>
			</div>
			<a
				href={CONTACT_SALES_HREF}
				target='_blank'
				rel='noopener noreferrer'
				className={cn(buttonVariants({ variant: "secondary" }), "w-full sm:w-auto shrink-0 no-underline")}
			>
				{t("cta")}
			</a>
		</div>
	)
}
