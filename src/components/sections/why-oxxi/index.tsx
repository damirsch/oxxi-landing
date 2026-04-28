import { IconCheckCircle, IconStars, IconXCircle } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import Image from "next/image"

const WHY_OXXI = [
	{
		title: "Traditional hiring",
		description: "Too many tabs open, where\u2019s that candidate?",
		image: "/why-oxxi/1.png",
		Icon: IconXCircle,
		color: "text-danger-primary",
		border: "border-secondary-border border-r",
	},
	{
		title: "Hiring with Oxxi",
		description: "Search, shortlist, and hire. All in one place",
		image: "/why-oxxi/2.png",
		Icon: IconCheckCircle,
		color: "text-success-primary",
		border: "",
	},
] as const

export default function WhyOxxi() {
	return (
		<SectionWrapper className='flex flex-col pb-10'>
			<SectionHeader
				title={"One workspace instead of\nendless disconnected tools"}
				badgeTitle='Why Oxxi'
				badgeIcon={<IconStars />}
			/>
			<div className='relative flex'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />

				{WHY_OXXI.map((item) => (
					<div key={item.title} className={`flex flex-col gap-6 px-10 pt-5 pb-10 w-full ${item.border}`}>
						<div className='flex flex-col items-center gap-3'>
							<div className={`flex items-center gap-1.5 font-semibold leading-none tracking-[-0.01em] ${item.color}`}>
								<item.Icon className='size-4' />
								{item.title}
							</div>
							<span className='font-semibold text-[15px] text-tertiary-text leading-none tracking-[-0.01em]'>
								{item.description}
							</span>
						</div>
						<Image
							className='shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] border border-primary-border rounded-[14px] object-contain pointer-events-none select-none'
							src={item.image}
							alt={item.title}
							width={520}
							height={280}
							draggable={false}
						/>
					</div>
				))}
			</div>
		</SectionWrapper>
	)
}
