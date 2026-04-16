import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlProxy = createMiddleware(routing)

export function proxy(request: NextRequest) {
	const response = intlProxy(request)

	response.headers.set("X-Robots-Tag", "noindex, nofollow")

	return response
}

export const config = {
	matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
}
