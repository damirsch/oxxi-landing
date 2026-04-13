import Link from "next/link";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-secondary-border bg-surface-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<Link href="/" className="text-xl font-bold text-primary-text">
					Oxxi
				</Link>
				<nav className="hidden md:flex items-center gap-8">
					<Link href="#features" className="text-sm text-secondary-text hover:text-primary-text transition-colors">
						Features
					</Link>
					<Link href="#pricing" className="text-sm text-secondary-text hover:text-primary-text transition-colors">
						Pricing
					</Link>
				</nav>
			</div>
		</header>
	);
}
