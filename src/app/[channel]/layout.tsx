import type { ReactNode } from "react";

interface ChannelLayoutProps {
	children: ReactNode;
	params: { channel: string };
}

function Header({ channel }: { channel: string }) {
	return (
		<header className="fixed left-0 right-0 top-0 z-50 border-b border-stone-200/10 bg-white/90 backdrop-blur-md dark:bg-[#0a0a0a]/90">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<a href={`https://www.pomandi.com/${channel}`} className="flex items-center">
					<span className="text-xl font-light tracking-wider text-stone-900 dark:text-white">
						POMANDI
					</span>
				</a>
				<nav className="hidden items-center gap-8 md:flex">
					<a
						href={`https://www.pomandi.com/${channel}/All-Suits`}
						className="text-sm font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
					>
						Collectie
					</a>
					<a
						href={`https://www.pomandi.com/${channel}/Wedding-Suits`}
						className="text-sm font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
					>
						Trouwpakken
					</a>
					<a
						href={`https://www.pomandi.com/${channel}/appointment`}
						className="rounded-none bg-stone-900 px-6 py-2 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200"
					>
						Afspraak
					</a>
				</nav>
			</div>
		</header>
	);
}

function Footer({ channel }: { channel: string }) {
	return (
		<footer className="border-t border-stone-200 bg-white py-12 dark:border-stone-800 dark:bg-[#0a0a0a]">
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid gap-8 md:grid-cols-4">
					<div>
						<span className="text-lg font-light tracking-wider text-stone-900 dark:text-white">
							POMANDI
						</span>
						<p className="mt-4 text-sm text-stone-600 dark:text-stone-400">
							Premium herenkostuums in Italiaanse stijl.
						</p>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-stone-900 dark:text-white">
							Winkels
						</h4>
						<div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
							<p>Bredabaan 299, 2930 Brasschaat</p>
							<p>Vennestraat 331, 3600 Genk</p>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-stone-900 dark:text-white">
							Contact
						</h4>
						<div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
							<p>info@pomandi.com</p>
							<p>+32 489 10 71 82</p>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-stone-900 dark:text-white">
							Links
						</h4>
						<div className="space-y-2 text-sm">
							<a
								href={`https://www.pomandi.com/${channel}/All-Suits`}
								className="block text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
							>
								Collectie
							</a>
							<a
								href={`https://www.pomandi.com/${channel}/appointment`}
								className="block text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
							>
								Afspraak maken
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t border-stone-200 pt-8 text-center text-sm text-stone-500 dark:border-stone-800">
					© {new Date().getFullYear()} Pomandi. Alle rechten voorbehouden.
				</div>
			</div>
		</footer>
	);
}

export default function ChannelLayout({ children, params }: ChannelLayoutProps) {
	return (
		<>
			<Header channel={params.channel} />
			<main className="pt-16">{children}</main>
			<Footer channel={params.channel} />
		</>
	);
}
