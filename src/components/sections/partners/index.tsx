import { Badge } from "@/components/ui/badge"
import { FullWidthLine, SectionWrapper } from "@/components/ui/wrappers"
import { cn } from "@/lib/utils"

type PartnerLogo = {
	src: string
	alt: string
	/** Optional `<img>` height; default `h-full` inside the row cell */
	imgHeightClass?: string
}

const partnerGroups: ReadonlyArray<{
	badge: string
	borderBottom: boolean
	logos: readonly PartnerLogo[]
}> = [
	{
		badge: "Hiring teams",
		borderBottom: true,
		logos: [
			{ src: "/partner-logos/Baraton.svg", alt: "Baraton", imgHeightClass: "h-8 sm:h-10" },
			{ src: "/partner-logos/Delivery.svg", alt: "Delivery", imgHeightClass: "h-8 sm:h-10" },
			{ src: "/partner-logos/Kait.svg", alt: "Kait" },
			{ src: "/partner-logos/MOOSH.svg", alt: "MOOSH" },
			{ src: "/partner-logos/Savor.svg", alt: "Savor" },
			{ src: "/partner-logos/UPayments.svg", alt: "UPayments" },
			{ src: "/partner-logos/Zad.svg", alt: "Zad" },
		],
	},
	{
		badge: "Tech partners",
		borderBottom: false,
		logos: [
			{ src: "/partner-logos/Veritone.svg", alt: "Veritone" },
			{ src: "/partner-logos/broadbean.svg", alt: "Broadbean", imgHeightClass: "h-10 sm:h-12" },
		],
	},
]

const partnerGroupBadgeClassName =
	"top-0 left-1/2 absolute px-2 sm:px-2.5 rounded-[6px] h-7 sm:h-8 text-xs sm:text-sm -translate-x-1/2 -translate-y-1/2"

const partnerRowClassName =
	"relative flex flex-wrap justify-center items-center gap-9 sm:gap-12 px-6 py-11 w-full"

export default function Partners() {
	return (
		<SectionWrapper>
			<p className='text-tertiary-text text-sm text-center tracking-[-0.01em]'>
				Trusted by <span className='font-semibold text-primary-text'>modern hiring teams</span>
			</p>
			<div className='relative flex flex-col mt-11 sm:mt-14'>
				<FullWidthLine position='top' />
				<FullWidthLine position='bottom' />
				{partnerGroups.map((group) => (
					<div
						key={group.badge}
						className={cn(partnerRowClassName, group.borderBottom && "border-secondary-border border-b")}
					>
						<Badge className={partnerGroupBadgeClassName}>{group.badge}</Badge>
						{group.logos.map((logo) => (
							<div key={logo.alt} className='flex justify-center items-center h-5 sm:h-6'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={logo.src}
									alt={logo.alt}
									className={cn("w-auto object-contain", logo.imgHeightClass ?? "h-full")}
									draggable={false}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</SectionWrapper>
	)
}
