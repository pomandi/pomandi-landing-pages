import Link from "next/link";
import type { StoresSection as StoresSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";
import { getStores, type StoreLocation } from "@/config/stores";

interface StoresSectionProps {
	config: StoresSectionConfig["config"];
	title?: LocalizedString;
	subtitle?: LocalizedString;
	background?: string;
	theme: ThemeConfig;
	channel: string;
	locale: string;
	campaign?: string;
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function StoresSection({
	config,
	title,
	subtitle,
	background,
	theme,
	channel,
	locale,
	campaign,
}: StoresSectionProps) {
	const stores = getStores(config.locations);

	if (stores.length === 0) return null;

	const bgClass =
		background === "primary"
			? theme.mode === "dark"
				? "bg-stone-900"
				: "bg-[#f8f7f5]"
			: theme.mode === "dark"
				? "bg-[#0a0a0a]"
				: "bg-white";

	const labels = {
		nl: {
			visitUs: "Bezoek ons",
			address: "Adres",
			whatsapp: "WhatsApp",
			email: "Email",
			hours: "Openingstijden",
			makeAppointment: "Afspraak maken",
			whatsappBtn: "WhatsApp",
		},
		fr: {
			visitUs: "Visitez-nous",
			address: "Adresse",
			whatsapp: "WhatsApp",
			email: "Email",
			hours: "Heures d'ouverture",
			makeAppointment: "Prendre rendez-vous",
			whatsappBtn: "WhatsApp",
		},
		en: {
			visitUs: "Visit us",
			address: "Address",
			whatsapp: "WhatsApp",
			email: "Email",
			hours: "Opening hours",
			makeAppointment: "Book appointment",
			whatsappBtn: "WhatsApp",
		},
	};

	const t = labels[locale as keyof typeof labels] || labels.nl;

	// If single store, show detailed view
	if (stores.length === 1 && config.style !== "minimal") {
		const store = stores[0];
		return (
			<section className={`${bgClass} py-20`}>
				<div className="mx-auto max-w-7xl px-6">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Map */}
						{config.showMap && store.mapEmbed && (
							<div
								className={`relative aspect-square overflow-hidden lg:aspect-[4/3] ${theme.mode === "dark" ? "bg-stone-800" : "bg-stone-200"}`}
							>
								<iframe
									src={store.mapEmbed}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
						)}

						{/* Info */}
						<div>
							<p
								className={`mb-4 text-sm font-medium uppercase tracking-wider ${theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}`}
							>
								{t.visitUs}
							</p>
							<h2
								className={`mb-6 text-3xl font-light ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
							>
								{store.name}
							</h2>
							{subtitle && (
								<p
									className={`mb-8 text-lg leading-relaxed ${theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}`}
								>
									{getLocalizedText(subtitle, locale)}
								</p>
							)}

							<div
								className={`mb-8 space-y-4 border-y py-8 ${theme.mode === "dark" ? "border-stone-700" : "border-stone-200"}`}
							>
								<div className="flex justify-between">
									<span className={theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}>
										{t.address}
									</span>
									<span
										className={`text-right ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
									>
										{store.address}, {store.city}
									</span>
								</div>
								{config.showWhatsApp && (
									<div className="flex justify-between">
										<span className={theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}>
											{t.whatsapp}
										</span>
										<span className={theme.mode === "dark" ? "text-white" : "text-stone-900"}>
											{store.phone}
										</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className={theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}>
										{t.email}
									</span>
									<span className={theme.mode === "dark" ? "text-white" : "text-stone-900"}>
										{store.email}
									</span>
								</div>
								{config.showHours && (
									<div className="flex justify-between">
										<span className={theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}>
											{t.hours}
										</span>
										<span
											className={`text-right ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
										>
											{store.hours[locale as keyof typeof store.hours] || store.hours.nl}
										</span>
									</div>
								)}
							</div>

							<div className="flex flex-col gap-4 sm:flex-row">
								<Link
									href={`/${channel}/appointment?locale=${locale}&shop=${store.id}${campaign ? `&campaign=${campaign}` : ""}`}
									className={`inline-flex items-center justify-center rounded-none px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${theme.mode === "dark" ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-stone-800"}`}
								>
									{t.makeAppointment}
								</Link>
								{config.showWhatsApp && store.whatsapp && (
									<a
										href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(locale === "fr" ? "Bonjour, je suis intéressé par un costume sur mesure." : "Hallo, ik heb interesse in een maatpak.")}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 rounded-none border border-[#25D366] bg-[#25D366] px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#128C7E]"
									>
										<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
										</svg>
										{t.whatsappBtn}
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Multiple stores - card grid
	return (
		<section className={`${bgClass} py-20`}>
			<div className="mx-auto max-w-7xl px-6">
				{title && (
					<div className="mb-12 text-center">
						<h2
							className={`mb-4 text-3xl font-light ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
						>
							{getLocalizedText(title, locale)}
						</h2>
						{subtitle && (
							<p className={theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}>
								{getLocalizedText(subtitle, locale)}
							</p>
						)}
					</div>
				)}

				<div className="grid gap-8 md:grid-cols-2">
					{stores.map((store) => (
						<StoreCard
							key={store.id}
							store={store}
							theme={theme}
							channel={channel}
							locale={locale}
							campaign={campaign}
							showMap={config.showMap}
							showHours={config.showHours}
							showWhatsApp={config.showWhatsApp}
							labels={t}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

interface StoreCardProps {
	store: StoreLocation;
	theme: ThemeConfig;
	channel: string;
	locale: string;
	campaign?: string;
	showMap?: boolean;
	showHours?: boolean;
	showWhatsApp?: boolean;
	labels: {
		visitUs: string;
		address: string;
		whatsapp: string;
		email: string;
		hours: string;
		makeAppointment: string;
		whatsappBtn: string;
	};
}

function StoreCard({
	store,
	theme,
	channel,
	locale,
	campaign,
	showHours,
	showWhatsApp,
	labels,
}: StoreCardProps) {
	return (
		<div
			className={`rounded-none border p-6 ${theme.mode === "dark" ? "border-stone-700 bg-stone-800" : "border-stone-200 bg-white"}`}
		>
			<h3 className={`mb-4 text-xl font-medium ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}>
				{store.name}
			</h3>

			<div className={`mb-6 space-y-2 ${theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}`}>
				<p>{store.address}</p>
				<p>{store.city}</p>
				{showHours && <p>{store.hours[locale as keyof typeof store.hours] || store.hours.nl}</p>}
			</div>

			<div className="flex flex-col gap-3">
				<Link
					href={`/${channel}/appointment?locale=${locale}&shop=${store.id}${campaign ? `&campaign=${campaign}` : ""}`}
					className={`inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${theme.mode === "dark" ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-stone-800"}`}
				>
					{labels.makeAppointment}
				</Link>
				{showWhatsApp && store.whatsapp && (
					<a
						href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 rounded-none border border-[#25D366] px-6 py-3 text-sm font-medium uppercase tracking-wider text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
					>
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
						</svg>
						{labels.whatsappBtn}
					</a>
				)}
			</div>
		</div>
	);
}
