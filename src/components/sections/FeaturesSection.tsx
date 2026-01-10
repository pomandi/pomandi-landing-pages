import type { FeaturesSection as FeaturesSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface FeaturesSectionProps {
	config: FeaturesSectionConfig["config"];
	title?: LocalizedString;
	subtitle?: LocalizedString;
	background?: string;
	animation?: string;
	theme: ThemeConfig;
	locale: string;
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

const iconMap: Record<string, JSX.Element> = {
	checkmark: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
		</svg>
	),
	users: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	),
	money: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	suit: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
			/>
		</svg>
	),
	clock: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	star: (
		<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
			/>
		</svg>
	),
};

export function FeaturesSection({
	config,
	title,
	subtitle,
	background,
	animation,
	theme,
	locale,
}: FeaturesSectionProps) {
	const bgClass =
		background === "dark"
			? "bg-stone-900 text-white"
			: background === "primary"
				? theme.mode === "dark"
					? "bg-stone-800"
					: "bg-[#f8f7f5]"
				: theme.mode === "dark"
					? "bg-[#0a0a0a]"
					: "bg-white";

	const isDarkBg = background === "dark" || theme.mode === "dark";

	const gridCols =
		config.columns === 2
			? "md:grid-cols-2"
			: config.columns === 4
				? "md:grid-cols-4"
				: "md:grid-cols-3";

	return (
		<section className={`${bgClass} py-20`}>
			<div className="mx-auto max-w-7xl px-6">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className={`mb-4 text-3xl font-light ${isDarkBg ? "text-white" : "text-stone-900"}`}>
								{getLocalizedText(title, locale)}
							</h2>
						)}
						{subtitle && (
							<p className={isDarkBg ? "text-stone-400" : "text-stone-600"}>
								{getLocalizedText(subtitle, locale)}
							</p>
						)}
					</div>
				)}

				<div className={`grid gap-12 ${gridCols}`}>
					{config.items.map((feature, i) => (
						<div
							key={i}
							className={`text-center ${animation === "stagger" ? `animate-fade-in-up animate-delay-${(i + 1) * 100}` : ""}`}
						>
							<div
								className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border ${isDarkBg ? "border-stone-700" : "border-stone-200"}`}
							>
								<span className={isDarkBg ? "text-stone-300" : "text-stone-600"}>
									{(feature.icon && iconMap[feature.icon]) || iconMap.checkmark}
								</span>
							</div>
							<h3 className={`mb-3 text-lg font-medium ${isDarkBg ? "text-white" : "text-stone-900"}`}>
								{getLocalizedText(feature.title, locale)}
							</h3>
							<p
								className={`text-sm leading-relaxed ${isDarkBg ? "text-stone-400" : "text-stone-600"}`}
							>
								{getLocalizedText(feature.description, locale)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
