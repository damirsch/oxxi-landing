"use client"

import {
	forwardRef,
	useState,
	useCallback,
	useLayoutEffect,
	useEffect,
	useRef,
	createContext,
	useContext,
	type ComponentRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

interface AnimatedTabsContextValue {
	hoveredValue: string | null
	isDragging: boolean
}

const AnimatedTabsContext = createContext<AnimatedTabsContextValue>({ hoveredValue: null, isDragging: false })

interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	urlParam?: string
	validValues?: string[]
}

const TabsWithUrlSync = forwardRef<ComponentRef<typeof TabsPrimitive.Root>, TabsProps & { urlParam: string }>(
	({ urlParam, validValues, value, defaultValue, onValueChange, ...props }, ref) => {
		const searchParams = useSearchParams()
		const router = useRouter()
		const pathname = usePathname()
		const initializedRef = useRef(false)

		const getValueFromUrl = useCallback(() => {
			const urlValue = searchParams.get(urlParam)
			if (urlValue && (!validValues || validValues.includes(urlValue))) {
				return urlValue
			}
			return null
		}, [urlParam, searchParams, validValues])

		const resolvedValue = getValueFromUrl() ?? value ?? defaultValue

		useEffect(() => {
			if (!initializedRef.current) {
				initializedRef.current = true
				const urlValue = getValueFromUrl()
				if (urlValue && urlValue !== value) {
					onValueChange?.(urlValue)
				}
			}
		}, [getValueFromUrl, value, onValueChange])

		const handleValueChange = (newValue: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(urlParam, newValue)
			router.replace(`${pathname}?${params.toString()}`)
			onValueChange?.(newValue)
		}

		return <TabsPrimitive.Root ref={ref} value={resolvedValue} onValueChange={handleValueChange} {...props} />
	}
)
TabsWithUrlSync.displayName = "TabsWithUrlSync"

const Tabs = forwardRef<ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
	({ urlParam, validValues, value, defaultValue, onValueChange, ...props }, ref) => {
		if (urlParam) {
			return (
				<TabsWithUrlSync
					ref={ref}
					urlParam={urlParam}
					validValues={validValues}
					value={value}
					defaultValue={defaultValue}
					onValueChange={onValueChange}
					{...props}
				/>
			)
		}

		return (
			<TabsPrimitive.Root
				ref={ref}
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				{...props}
			/>
		)
	}
)
Tabs.displayName = "Tabs"

const TabsList = forwardRef<
	ComponentRef<typeof TabsPrimitive.List>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex relative items-center p-0.5 bg-tertiary-border border border-primary-border rounded-[8px] h-[36px]",
			className
		)}
		{...props}
	/>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
	ComponentRef<typeof TabsPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, ...props }, ref) => {
	const { hoveredValue, isDragging } = useContext(AnimatedTabsContext)
	const isHovered = hoveredValue !== null && hoveredValue === value

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			value={value}
			className={cn(
				"inline-flex z-10 relative justify-center items-center disabled:opacity-50 px-4 rounded-[6px] h-full text-[15px] whitespace-nowrap transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none",
				isDragging
					? isHovered
						? "text-primary-text"
						: "text-tertiary-text"
					: "data-[state=active]:text-primary-text data-[state=inactive]:text-tertiary-text",
				className
			)}
			{...props}
		/>
	)
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
	ComponentRef<typeof TabsPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn("mt-2", className)} {...props} />)
TabsContent.displayName = TabsPrimitive.Content.displayName

interface TabPosition {
	left: number
	width: number
	center: number
}

interface TabsIndicatorProps {
	className?: string
	activeTabIndex: number
	dragOffset?: number
	isDragging?: boolean
	tabPositions: TabPosition[]
}

const TabsIndicator = forwardRef<HTMLDivElement, TabsIndicatorProps>(
	({ className, activeTabIndex, dragOffset = 0, isDragging = false, tabPositions }, ref) => {
		const [ready, setReady] = useState(false)
		const hasPositions = tabPositions.length > 0

		useEffect(() => {
			if (!hasPositions) return
			const id = requestAnimationFrame(() => setReady(true))
			return () => cancelAnimationFrame(id)
		}, [hasPositions])

		const getPosition = useCallback(() => {
			if (tabPositions.length === 0) return { x: 0, width: 0 }
			const currentPos = tabPositions[activeTabIndex]
			if (!currentPos) return { x: 0, width: 0 }
			if (dragOffset === 0) {
				return { x: currentPos.left, width: currentPos.width }
			}
			const targetIndex =
				dragOffset > 0 ? Math.min(activeTabIndex + 1, tabPositions.length - 1) : Math.max(activeTabIndex - 1, 0)
			const targetPos = tabPositions[targetIndex]
			if (!targetPos || targetIndex === activeTabIndex) {
				return { x: currentPos.left + dragOffset, width: currentPos.width }
			}
			const distanceToTarget = Math.abs(targetPos.center - currentPos.center)
			const progress = Math.min(Math.abs(dragOffset) / distanceToTarget, 1)
			return {
				x: currentPos.left + (targetPos.left - currentPos.left) * progress,
				width: currentPos.width + (targetPos.width - currentPos.width) * progress,
			}
		}, [activeTabIndex, dragOffset, tabPositions])

		const { x, width } = getPosition()

		if (tabPositions.length === 0) return null

		return (
			<div
				ref={ref}
				style={{
					transform: `translateX(${x}px)`,
					width: `${width}px`,
				}}
				className={cn(
					"left-0 z-0 absolute inset-y-0.5 rounded-[6px] pointer-events-none",
					"bg-surface-background",
					"shadow-[0px_2px_6px_0_rgba(0,0,0,0.08)] border border-primary-border",
					ready && !isDragging && "transition-[transform,width] duration-200 ease-out",
					className
				)}
			/>
		)
	}
)
TabsIndicator.displayName = "TabsIndicator"

const AnimatedTabs = forwardRef<
	ComponentRef<typeof TabsPrimitive.Root>,
	TabsProps & {
		activeTabIndex: number
		totalTabs: number
		tabValues?: string[]
		children: ReactNode
	}
>(
	(
		{ activeTabIndex, totalTabs, tabValues, children, className, urlParam, validValues, onValueChange, ...props },
		ref
	) => {
		const tabsListRef = useRef<HTMLDivElement>(null)
		const [dragOffset, setDragOffset] = useState(0)
		const [isDragging, setIsDragging] = useState(false)
		const [tabPositions, setTabPositions] = useState<TabPosition[]>([])
		const dragStartX = useRef(0)

		const updateTabPositions = useCallback(() => {
			const list = tabsListRef.current
			if (!list) return
			const triggers = list.querySelectorAll<HTMLElement>('[role="tab"]')
			const listRect = list.getBoundingClientRect()
			const listStyle = getComputedStyle(list)
			const borderLeft = parseFloat(listStyle.borderLeftWidth) || 0
			const positions = Array.from(triggers).map((trigger) => {
				const rect = trigger.getBoundingClientRect()
				const left = rect.left - listRect.left - borderLeft
				return {
					left,
					width: rect.width,
					center: left + rect.width / 2,
				}
			})
			setTabPositions(positions)
		}, [])

		useLayoutEffect(() => {
			updateTabPositions()
		}, [updateTabPositions, totalTabs])

		useEffect(() => {
			window.addEventListener("resize", updateTabPositions)
			return () => window.removeEventListener("resize", updateTabPositions)
		}, [updateTabPositions])

		const getDragConstraints = useCallback(() => {
			if (tabPositions.length === 0) return { min: 0, max: 0 }
			const currentPos = tabPositions[activeTabIndex]
			if (!currentPos) return { min: 0, max: 0 }
			const firstPos = tabPositions[0]
			const lastPos = tabPositions[tabPositions.length - 1]
			const minOffset = firstPos.center - currentPos.center
			const maxOffset = lastPos.center - currentPos.center
			return { min: minOffset, max: maxOffset }
		}, [tabPositions, activeTabIndex])

		const isPointerDown = useRef(false)
		const DRAG_THRESHOLD = 3

		const handlePointerDown = (e: React.PointerEvent) => {
			if (!tabValues) return
			updateTabPositions()
			dragStartX.current = e.clientX
			isPointerDown.current = true
			;(e.target as HTMLElement).setPointerCapture(e.pointerId)
		}

		const handlePointerMove = (e: React.PointerEvent) => {
			if (!isPointerDown.current) return
			const delta = e.clientX - dragStartX.current
			if (!isDragging && Math.abs(delta) > DRAG_THRESHOLD) {
				setIsDragging(true)
			}
			if (isDragging) {
				const constraints = getDragConstraints()
				const clampedDelta = Math.max(constraints.min, Math.min(constraints.max, delta))
				setDragOffset(clampedDelta)
			}
		}

		const getClosestTabIndex = useCallback(() => {
			if (tabPositions.length === 0 || !isDragging) return activeTabIndex
			const currentPos = tabPositions[activeTabIndex]
			if (!currentPos) return activeTabIndex
			const indicatorCenter = currentPos.center + dragOffset
			let closestIndex = activeTabIndex
			let minDistance = Infinity
			tabPositions.forEach((pos, i) => {
				const distance = Math.abs(pos.center - indicatorCenter)
				if (distance < minDistance) {
					minDistance = distance
					closestIndex = i
				}
			})
			return closestIndex
		}, [tabPositions, activeTabIndex, dragOffset, isDragging])

		const closestTabIndex = getClosestTabIndex()
		const hoveredValue = isDragging && tabValues ? tabValues[closestTabIndex] : null

		const finishDrag = useCallback(() => {
			isPointerDown.current = false
			if (!isDragging) return
			setIsDragging(false)
			if (!tabValues || !onValueChange || tabPositions.length === 0) {
				setDragOffset(0)
				return
			}
			if (closestTabIndex !== activeTabIndex) {
				onValueChange(tabValues[closestTabIndex])
			}
			setDragOffset(0)
		}, [isDragging, tabValues, onValueChange, tabPositions, activeTabIndex, closestTabIndex])

		const handlePointerUp = (e: React.PointerEvent) => {
			if (!isPointerDown.current) return
			;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
			finishDrag()
		}

		const handlePointerLeave = (e: React.PointerEvent) => {
			if (isPointerDown.current) {
				try {
					;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
				} catch {
					// ignore if already released
				}
				finishDrag()
			}
		}

		return (
			<AnimatedTabsContext.Provider value={{ hoveredValue, isDragging }}>
				<Tabs ref={ref} urlParam={urlParam} validValues={validValues} onValueChange={onValueChange} {...props}>
					<TabsList
						ref={tabsListRef}
						className={cn("relative touch-none", className)}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerLeave={handlePointerLeave}
						onPointerCancel={() => {
							isPointerDown.current = false
							setIsDragging(false)
							setDragOffset(0)
						}}
					>
						<TabsIndicator
							activeTabIndex={activeTabIndex}
							dragOffset={dragOffset}
							isDragging={isDragging}
							tabPositions={tabPositions}
						/>
						{children}
					</TabsList>
				</Tabs>
			</AnimatedTabsContext.Provider>
		)
	}
)
AnimatedTabs.displayName = "AnimatedTabs"

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator, AnimatedTabs }
