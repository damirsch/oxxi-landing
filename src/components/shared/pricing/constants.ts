import type { FC } from "react"
import type { IconProps } from "@/components/ui/icons"
import {
	IconBenchmark,
	IconCalendar,
	IconClockRewind,
	IconFile,
	IconFolder,
	IconGlobe,
	IconInfinity,
	IconJob,
	IconList,
	IconLock,
	IconMessageTextCircle,
	IconPlus,
	IconStars,
	IconTarget,
	IconUser,
	IconUsers,
} from "@/components/ui/icons"

export type PricingCtaVariant = "default" | "secondary"

export type PricingFeature = {
	Icon: FC<IconProps>
	label: string
}

export type PricingPlan = {
	id: string
	name: string
	tagline: string
	monthlyPrice: number
	features: PricingFeature[]
	recommended?: boolean
	ctaLabel: string
	ctaVariant: PricingCtaVariant
}

/** Same Telegram link as oxxi-frontend upgrade plan enterprise CTA */
export const CONTACT_SALES_HREF = "https://t.me/hodler00"

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		tagline: "Explore Oxxi",
		monthlyPrice: 0,
		features: [
			{ Icon: IconUser, label: "1 user" },
			{ Icon: IconClockRewind, label: "300 refresh credits everyday" },
			{ Icon: IconStars, label: "4,000 credits per month" },
			{ Icon: IconFolder, label: "Talent vault" },
			{ Icon: IconFile, label: "Unlimited CV uploads" },
			{ Icon: IconLock, label: "Private talent pools" },
			{ Icon: IconMessageTextCircle, label: "AI chat with your uploaded data" },
		],
		ctaLabel: "Start for free",
		ctaVariant: "secondary",
	},
	{
		id: "lite",
		name: "Lite",
		tagline: "Occasional hiring",
		monthlyPrice: 159,
		features: [
			{ Icon: IconUsers, label: "3 users" },
			{ Icon: IconPlus, label: "Everything in Free" },
			{ Icon: IconJob, label: "3 active job slots" },
			{ Icon: IconGlobe, label: "Candidate sourcing" },
			{ Icon: IconTarget, label: "Hire for active roles" },
			{ Icon: IconList, label: "Candidate profiles with context" },
		],
		ctaLabel: "Start hiring",
		ctaVariant: "default",
	},
	{
		id: "pro",
		name: "Pro",
		tagline: "For growing teams",
		monthlyPrice: 399,
		features: [
			{ Icon: IconUsers, label: "5 users" },
			{ Icon: IconPlus, label: "Everything in Lite" },
			{ Icon: IconInfinity, label: "Unlimited job slots" },
			{ Icon: IconBenchmark, label: "Salary benchmarks" },
			{ Icon: IconCalendar, label: "Interview scheduling" },
		],
		recommended: true,
		ctaLabel: "Start hiring",
		ctaVariant: "secondary",
	},
]

/*
 * ADDONS_FROM_APP (reference only — not shown on landing)
 * From oxxi-frontend `widgets/upgrade-plan/model/constants.ts`:
 *
 * Lite addOns:
 *   { id: "sourcing", name: "Sourcing Agent", price: { monthly: 49, annually: 44 }, ... }
 *   { id: "outreach", name: "Outreach Agent", price: { monthly: 79, annually: 71 }, ... }
 * Pro addOns:
 *   { id: "sourcing", name: "Sourcing Agent", price: { monthly: 0, annually: 0 }, ... }
 *   { id: "outreach", name: "Outreach Agent", price: { monthly: 0, annually: 0 }, ... }
 */
