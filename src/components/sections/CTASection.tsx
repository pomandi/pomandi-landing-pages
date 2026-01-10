import Link from "next/link";
import type { CTASection as CTASectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface CTASectionProps {
	config: CTASectionConfig["config"];
	background?: string;
	theme: ThemeConfig;
	channel: string;
	locale: string;
	campaign?: string;
	store?: string;
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function CTASection({
	config,
	background,
	theme,
	channel,
	locale,
	campaign,
	store,
}: CTASectionProps) {
	const bgClass =
		background === "dark" || background === "primary"
			? "bg-stone-900 text-white"
			: background === "gradient"
				? `bg-gradient-to-br from-stone-900 to-stone-800 text-white`
				: theme.mode === "dark"
					? "bg-stone-900 text-white"
					: "bg-white";

	const isDarkBg = background === "dark" || background === "primary" || background === "gradient" || theme.mode === "dark";

	const appointmentUrl = `/${channel}/appointment?locale=${locale}${store ? `&shop=${store}` : ""}${campaign ? `&campaign=${campaign}` : ""}`;

	return (
		<section className={`${bgClass} py-20`}>
			<div className="mx-auto max-w-3xl px-6 text-center">
				<h2
					className={`mb-4 text-3xl font-light ${isDarkBg ? "text-white" : "text-stone-900"}`}
				>
					{getLocalizedText(config.title, locale)}
				</h2>
				{config.subtitle && (
					<p className={`mb-8 ${isDarkBg ? "text-stone-400" : "text-stone-600"}`}>
						{getLocalizedText(config.subtitle, locale)}
					</p>
				)}
				<Link
					href={config.button.href || appointmentUrl}
					className={`inline-flex items-center justify-center rounded-none px-10 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
						isDarkBg
							? "bg-white text-stone-900 hover:bg-stone-100"
							: "bg-stone-900 text-white hover:bg-stone-800"
					}`}
				>
					{getLocalizedText(config.button.text, locale)}
				</Link>
			</div>
		</section>
	);
}
