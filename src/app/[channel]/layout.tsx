import type { ReactNode } from "react";
import Image from "next/image";

interface ChannelLayoutProps {
	children: ReactNode;
	params: { channel: string };
}

function Header({ channel }: { channel: string }) {
	const baseUrl = "https://www.pomandi.com";

	return (
		<header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-lg">
			{/* Top Bar - Promo Banner */}
			<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-2 text-center text-sm text-white">
				<span className="font-medium">Premium Maatpakken vanaf €320</span>
				<span className="mx-2 text-amber-400">|</span>
				<a
					href={`${baseUrl}/${channel}/appointment`}
					className="font-semibold text-amber-400 hover:text-amber-300"
				>
					Boek Gratis Afspraak
				</a>
			</div>

			{/* Main Header */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4 md:gap-8">
					{/* Logo */}
					<a href={`${baseUrl}/${channel}`} className="group flex items-center">
						<div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 shadow-md ring-1 ring-amber-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/10 group-hover:ring-amber-500/40">
							<Image
								src="/_landing/logo.jpeg"
								alt="Pomandi Men's Suits"
								width={120}
								height={40}
								className="h-8 w-auto object-contain"
								priority
							/>
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-6 md:flex lg:gap-8">
						<a
							href={`${baseUrl}/${channel}/collections/All-Suits`}
							className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
						>
							Collectie
						</a>
						<a
							href={`${baseUrl}/${channel}/collections/Wedding-Suits`}
							className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
						>
							Trouwpakken
						</a>
						<a
							href={`${baseUrl}/${channel}/collections/peaky-blinders-historische-outfits`}
							className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
						>
							British Style
						</a>
						<a
							href={`${baseUrl}/${channel}/appointment`}
							className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/40"
						>
							Afspraak Maken
						</a>
					</nav>

					{/* Mobile Menu Button */}
					<div className="flex items-center gap-3 md:hidden">
						<a
							href={`${baseUrl}/${channel}/appointment`}
							className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white"
						>
							Afspraak
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

function Footer({ channel }: { channel: string }) {
	const baseUrl = "https://www.pomandi.com";
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-b from-slate-900 to-slate-950">
			{/* Main Footer Content */}
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div className="lg:col-span-1">
						<div className="mb-4">
							<a href={`${baseUrl}/${channel}`} className="flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30">
									<span className="text-lg font-bold text-slate-900">P</span>
								</div>
								<span className="text-xl font-bold text-white">Pomandi</span>
							</a>
						</div>
						<p className="mb-4 text-sm leading-relaxed text-gray-400">
							Professionele kleermakerij met bijna 10 jaar ervaring. Maatpakken voor bruiloften,
							zakelijk en speciale gelegenheden.
						</p>
						<p className="text-xs text-gray-500">BTW: BE0791452593</p>

						{/* Social Links */}
						<div className="mt-6">
							<p className="mb-3 text-sm font-medium text-white">Volg Ons</p>
							<div className="flex gap-3">
								<a
									href="https://www.facebook.com/pomandi.be"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-gray-400 transition-all hover:bg-amber-500 hover:text-white"
									aria-label="Facebook"
								>
									<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
									</svg>
								</a>
								<a
									href="https://www.instagram.com/pomandi.be"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-gray-400 transition-all hover:bg-amber-500 hover:text-white"
									aria-label="Instagram"
								>
									<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
									</svg>
								</a>
							</div>
						</div>
					</div>

					{/* Collections */}
					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Collecties
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href={`${baseUrl}/${channel}/collections/All-Suits`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Alle Pakken
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/collections/Wedding-Suits`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Trouwpakken
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/collections/peaky-blinders-historische-outfits`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									British Style
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/collections/Blue-Suits`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Blauwe Pakken
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/collections/Black-Suits`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Zwarte Pakken
								</a>
							</li>
						</ul>
					</div>

					{/* Pages */}
					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Pagina&apos;s
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href={`${baseUrl}/${channel}/appointment`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Afspraak Maken
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/pages/hoe-werkt-het`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Hoe Werkt Het
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/pages/over-ons`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									Over Ons
								</a>
							</li>
							<li>
								<a
									href={`${baseUrl}/${channel}/pages/veelgestelde-vragen`}
									className="text-sm text-gray-400 transition-colors hover:text-amber-400"
								>
									FAQ
								</a>
							</li>
						</ul>
					</div>

					{/* Stores & Contact */}
					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Onze Winkels
						</h3>
						<ul className="space-y-4">
							<li>
								<p className="mb-1 font-medium text-white">Winkel Brasschaat</p>
								<p className="text-sm text-gray-400">Bredabaan 299</p>
								<p className="text-sm text-gray-400">2930 Brasschaat</p>
							</li>
							<li>
								<p className="mb-1 font-medium text-white">Winkel Genk</p>
								<p className="text-sm text-gray-400">Vennestraat 331</p>
								<p className="text-sm text-gray-400">3600 Genk</p>
							</li>
						</ul>

						{/* Contact Info */}
						<div className="mt-6 space-y-2">
							<a
								href="https://wa.me/32489107182?text=Hallo%2C%20ik%20heb%20interesse%20in%20een%20maatpak.%20Kan%20ik%20een%20afspraak%20maken%3F"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#25D366]"
							>
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
								</svg>
								+32 489 10 71 82
							</a>
							<a
								href="mailto:info@pomandi.com"
								className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-amber-400"
							>
								<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								info@pomandi.com
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-slate-800 bg-slate-950">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
						<p className="text-sm text-gray-500">© {currentYear} Pomandi. Alle rechten voorbehouden.</p>
						<p className="text-xs text-gray-600">
							Wettelijke conformiteitsgarantie: De wettelijke conformiteitsgarantie van 2 jaar voor
							consumptiegoederen is van toepassing.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default function ChannelLayout({ children, params }: ChannelLayoutProps) {
	return (
		<>
			<Header channel={params.channel} />
			<main className="pt-[104px]">{children}</main>
			<Footer channel={params.channel} />
		</>
	);
}
