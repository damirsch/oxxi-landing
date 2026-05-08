import { IconBenchmark, IconCandidate, IconJob } from "@/components/ui/icons"

export const CYCLE_MS = 6_000

export const KEY_FEATURE_ITEMS = [
	{ id: "headhunting" as const, Icon: IconCandidate },
	{ id: "distribution" as const, Icon: IconJob },
	{ id: "benchmarks" as const, Icon: IconBenchmark },
]
