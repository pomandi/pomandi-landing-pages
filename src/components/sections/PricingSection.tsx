import type { PricingSection as PricingSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface PricingSectionProps {
	config: PricingSectionConfig["config"];
	title?: LocalizedString;
	subtitle?: LocalizedString;
	background?: string;
	theme: ThemeConfig;
	locale: string;
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function PricingSection({ config, title, subtitle, background, theme, locale }: PricingSectionProps) {
	const bgClass =
		background === "dark"
			? "bg-stone-900"
			: background === "primary"
				? theme.mode === "dark"
					? "bg-stone-800"
					: "bg-[#f8f7f5]"
				: theme.mode === "dark"
					? "bg-[#0a0a0a]"
					: "bg-white";

	const isDarkBg = background === "dark" || theme.mode === "dark";
	const accentColor = theme.primary || "#c0a062";

	return (
		<section className={`${bgClass} py-24`}>
			<div className="mx-auto max-w-4xl px-6">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
						{subtitle && (
							<span
								className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em]"
								style={{ color: accentColor }}
							>
								{getLocalizedText(subtitle, locale)}
							</span>
						)}
						{title && (
							<h2
								className={`text-3xl font-light sm:text-4xl ${isDarkBg ? "text-white" : "text-stone-900"}`}
							>
								{getLocalizedText(title, locale)}
							</h2>
						)}
					</div>
				)}

				<div className={`overflow-hidden border ${isDarkBg ? "border-white/10" : "border-stone-200"}`}>
					<table className="w-full">
						<thead>
							<tr
								className={`border-b ${isDarkBg ? "border-white/10" : "border-stone-200"}`}
								style={{ backgroundColor: `${accentColor}20` }}
							>
								<th
									className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider"
									style={{ color: accentColor }}
								>
									Product
								</th>
								<th
									className="px-6 py-4 text-right text-sm font-medium uppercase tracking-wider"
									style={{ color: accentColor }}
								>
									{locale === "fr" ? "Prix" : locale === "en" ? "Price" : "Prijs"}
								</th>
							</tr>
						</thead>
						<tbody className={`divide-y ${isDarkBg ? "divide-white/5" : "divide-stone-100"}`}>
							{config.items.map((item, i) => (
								<tr
									key={i}
									className={`transition-colors ${isDarkBg ? "hover:bg-white/5" : "hover:bg-stone-50"}`}
								>
									<td className={`px-6 py-5 ${isDarkBg ? "text-white" : "text-stone-900"}`}>
										{getLocalizedText(item.name, locale)}
									</td>
									<td className="px-6 py-5 text-right font-medium" style={{ color: accentColor }}>
										{item.price}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{config.note && (
					<p
						className={`mt-6 text-center text-sm ${isDarkBg ? "text-stone-400" : "text-stone-500"}`}
					>
						{getLocalizedText(config.note, locale)}
					</p>
				)}
			</div>
		</section>
	);
}
