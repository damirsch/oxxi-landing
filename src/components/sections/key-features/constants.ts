import { IconBenchmark, IconCandidate, IconJob } from "@/components/ui/icons"

export const CYCLE_MS = 6_000

export const KEY_FEATURE_ITEMS = [
	{
		title: "AI Headhunting",
		description: "Find top candidates or build your entire team with a single message",
		Icon: IconCandidate,
	},
	{
		title: "Job Distribution",
		description: "Create a job once and publish automatically across global job boards",
		Icon: IconJob,
	},
	{
		title: "Salary Benchmarks",
		description: "Compare salaries by role, location, and experience — real-time data",
		Icon: IconBenchmark,
	},
] as const
