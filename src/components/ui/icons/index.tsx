import { cn } from "@/lib/utils"
import React from "react"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	children?: React.ReactNode
	className?: string
	strokeWidth?: number | string
}

export const Icon: React.FC<IconProps> = ({ children, className, strokeWidth = 1.5, style, ...props }) => {
	const merged = cn("size-5 text-inherit transition-all duration-200", className)

	return (
		<svg
			className={merged}
			width={props.width || 20}
			height={props.height || 20}
			viewBox={props.viewBox || "0 0 20 20"}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={
				{
					...style,
					"--icon-stroke-width": strokeWidth,
				} as React.CSSProperties
			}
			{...props}
		>
			{children}
		</svg>
	)
}

export const IconSearch: React.FC<IconProps> = ({ className, ...props }) => (
	<Icon viewBox='0 0 14 14' className={className} {...props}>
		<path
			d='M12.25 12.25L8.75006 8.75M9.91667 5.83333C9.91667 8.0885 8.0885 9.91667 5.83333 9.91667C3.57817 9.91667 1.75 8.0885 1.75 5.83333C1.75 3.57817 3.57817 1.75 5.83333 1.75C8.0885 1.75 9.91667 3.57817 9.91667 5.83333Z'
			stroke='currentColor'
			strokeWidth='var(--icon-stroke-width, 1.4)'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Icon>
)

export const IconCalendarCheck: React.FC<IconProps> = ({ className, ...props }) => (
	<Icon viewBox='0 0 14 14' className={className} {...props}>
		<path
			d='M12.25 5.83332H1.75M12.25 7.29166V5.13332C12.25 4.15323 12.25 3.66319 12.0593 3.28884C11.8915 2.95956 11.6238 2.69184 11.2945 2.52406C10.9201 2.33332 10.4301 2.33332 9.45 2.33332H4.55C3.56991 2.33332 3.07986 2.33332 2.70552 2.52406C2.37623 2.69184 2.10852 2.95956 1.94074 3.28884C1.75 3.66319 1.75 4.15323 1.75 5.13332V10.0333C1.75 11.0134 1.75 11.5035 1.94074 11.8778C2.10852 12.2071 2.37623 12.4748 2.70552 12.6426C3.07986 12.8333 3.56991 12.8333 4.55 12.8333H7M9.33333 1.16666V3.49999M4.66667 1.16666V3.49999M8.45833 11.0833L9.625 12.25L12.25 9.62499'
			stroke='currentColor'
			strokeWidth='var(--icon-stroke-width, 1.4)'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Icon>
)

export const IconAnnouncement: React.FC<IconProps> = ({ className, ...props }) => (
	<Icon viewBox='0 0 14 14' className={className} {...props}>
		<path
			d='M10.7917 9.33333C11.9193 9.33333 12.8334 7.63575 12.8334 5.54167C12.8334 3.44759 11.9193 1.75 10.7917 1.75M10.7917 9.33333C9.66411 9.33333 8.75002 7.63575 8.75002 5.54167C8.75002 3.44759 9.66411 1.75 10.7917 1.75M10.7917 9.33333L3.17542 7.94856C2.63438 7.85019 2.36387 7.801 2.14513 7.69356C1.70013 7.47497 1.36873 7.07788 1.23327 6.60096C1.16669 6.36653 1.16669 6.09157 1.16669 5.54167C1.16669 4.99176 1.16669 4.71681 1.23327 4.48237C1.36873 4.00545 1.70013 3.60837 2.14513 3.38978C2.36387 3.28233 2.63438 3.23315 3.17542 3.13478L10.7917 1.75M2.91669 8.16667L3.14644 11.3832C3.16826 11.6886 3.17916 11.8414 3.24561 11.9571C3.30412 12.059 3.39204 12.1409 3.49786 12.192C3.61804 12.25 3.77116 12.25 4.0774 12.25H5.11714C5.46722 12.25 5.64226 12.25 5.77182 12.1802C5.88566 12.1188 5.97589 12.0214 6.02832 11.9032C6.08799 11.7687 6.07457 11.5941 6.04772 11.2451L5.83335 8.45833'
			stroke='currentColor'
			strokeWidth='var(--icon-stroke-width, 1.4)'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Icon>
)
