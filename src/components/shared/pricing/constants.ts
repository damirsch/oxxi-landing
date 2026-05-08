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

export type PricingPlanId = "free" | "lite" | "pro"

export type PricingPlan = {
	id: PricingPlanId
	monthlyPrice: number
	featureIcons: FC<IconProps>[]
	recommended?: boolean
	ctaVariant: PricingCtaVariant
}

export const CONTACT_SALES_HREF = "https://t.me/hodler00"

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		monthlyPrice: 0,
		featureIcons: [IconUser, IconClockRewind, IconStars, IconFolder, IconFile, IconLock, IconMessageTextCircle],
		ctaVariant: "secondary",
	},
	{
		id: "lite",
		monthlyPrice: 159,
		featureIcons: [IconUsers, IconPlus, IconJob, IconGlobe, IconTarget, IconList],
		ctaVariant: "default",
	},
	{
		id: "pro",
		monthlyPrice: 399,
		featureIcons: [IconUsers, IconPlus, IconInfinity, IconBenchmark, IconCalendar],
		recommended: true,
		ctaVariant: "secondary",
	},
]
