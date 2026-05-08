import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { FAQItem } from "./faq-item"
import { getTranslations } from "next-intl/server"

export default async function FAQ() {
	const t = await getTranslations("faq")

	const items = Array.from({ length: 5 }, (_, i) => ({
		question: t(`items.${i}.question`),
		answer: t(`items.${i}.answer`),
	}))

	return (
		<SectionWrapper id='faq' className='relative flex flex-col'>
			<div className='relative flex flex-col items-center gap-5 lg:gap-8 lg:py-20 pb-14 lg:pb-20'>
				<FullWidthLine position='top' className='max-lg:hidden' />
				<SectionHeader title={t("title")} description={t("description")} />
				<div className='px-5 lg:px-12 lg:py-7 w-full max-w-[980px]'>
					{items.map((item) => (
						<FAQItem key={item.question} question={item.question} answer={item.answer} />
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
