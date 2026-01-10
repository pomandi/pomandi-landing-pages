import type { StatsSection as StatsSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface StatsSectionProps {
	config: StatsSectionConfig["config"];
	theme: ThemeConfig;
	locale: string;
}

function getLocalizedText(text: LocalizedString, locale: string): string {
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function StatsSection({ config, theme, locale }: StatsSectionProps) {
	return (
		<section
			className={`border-y py-6 ${theme.mode === "dark" ? "border-stone-800 bg-stone-900" : "border-stone-200 bg-white"}`}
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
					{config.items.map((stat, i) => (
						<div key={i} className="text-center">
							<p
								className={`text-2xl font-light ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
							>
								{stat.value}
							</p>
							<p className={theme.mode === "dark" ? "text-sm text-stone-400" : "text-sm text-stone-500"}>
								{getLocalizedText(stat.label, locale)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
