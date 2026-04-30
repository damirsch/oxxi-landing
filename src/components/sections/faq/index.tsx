import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { FAQItem } from "./faq-item"

const FAQ_ITEMS = [
	{
		question: "Do I need existing hiring data?",
		answer:
			"No. Oxxi starts sourcing from the public web from day one. Existing data simply makes it stronger over time",
	},
	{
		question: "Does it replace ATS?",
		answer:
			"Yes. Oxxi includes a built-in ATS, along with sourcing, outreach, scheduling, salary intelligence, and hiring memory",
	},
	{
		question: "Can it automate outreach and scheduling?",
		answer: "Yes. Outreach and scheduling can be automated, with recruiter approval at every step",
	},
	{
		question: "Is it suitable for agencies?",
		answer: "Yes. Oxxi is designed to handle multiple roles and clients with shared hiring memory",
	},
	{
		question: "Is my data private?",
		answer: "Yes. Your data is always private and is never used for model training.",
	},
] as const

export default function FAQ() {
	return (
		<SectionWrapper className='relative flex flex-col'>
			<div className='relative flex flex-col items-center gap-8 pt-20'>
				<FullWidthLine position='top' />
				<SectionHeader title='FAQs' description={"Get answers to the most common \n questions about Oxxi"} />
				<div className='px-12 py-7 w-full max-w-[980px]'>
					{FAQ_ITEMS.map((item) => (
						<FAQItem key={item.question} question={item.question} answer={item.answer} />
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
