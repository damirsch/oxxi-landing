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

export type BillingPeriod = "monthly" | "yearly"

export type PricingCtaVariant = "default" | "secondary"

export type PricingPlanId = "free" | "lite" | "pro"

export type PricingPlan = {
	id: PricingPlanId
	price: { monthly: number; yearly: number }
	featureIcons: FC<IconProps>[]
	recommended?: boolean
	ctaVariant: PricingCtaVariant
}

export const CONTACT_SALES_HREF = "https://t.me/hodler00"

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		price: { monthly: 0, yearly: 0 },
		featureIcons: [IconUser, IconClockRewind, IconStars, IconFolder, IconFile, IconLock, IconMessageTextCircle],
		ctaVariant: "secondary",
	},
	{
		id: "lite",
		price: { monthly: 159, yearly: 127 },
		featureIcons: [IconUsers, IconPlus, IconJob, IconGlobe, IconTarget, IconList],
		ctaVariant: "default",
	},
	{
		id: "pro",
		price: { monthly: 399, yearly: 319 },
		featureIcons: [IconUsers, IconPlus, IconInfinity, IconBenchmark, IconCalendar],
		recommended: true,
		ctaVariant: "secondary",
	},
]
