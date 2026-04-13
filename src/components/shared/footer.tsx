"use client";

import { useTranslations } from "next-intl";

export function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="border-t border-secondary-border bg-secondary-background">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
				<p className="text-sm text-tertiary-text">
					&copy; {new Date().getFullYear()} Oxxi. {t("rights")}
				</p>
			</div>
		</footer>
	);
}
