import type { QuoteSection as QuoteSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface QuoteSectionProps {
	config: QuoteSectionConfig["config"];
	background?: string;
	animation?: string;
	theme: ThemeConfig;
	locale: string;
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function QuoteSection({ config, background, animation, theme, locale }: QuoteSectionProps) {
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

	const animationClass = animation === "fade-in" ? "animate-fade-in" : "";

	return (
		<section className={`${bgClass} py-20`}>
			<div className={`mx-auto max-w-4xl px-6 text-center ${animationClass}`}>
				<svg
					className={`mx-auto mb-8 h-12 w-12 ${isDarkBg ? "text-stone-600" : "text-stone-300"}`}
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
				</svg>

				<blockquote
					className={`mb-8 text-2xl font-light italic leading-relaxed md:text-3xl ${isDarkBg ? "text-white" : "text-stone-900"}`}
				>
					{getLocalizedText(config.text, locale)}
				</blockquote>

				{config.author && (
					<cite
						className={`text-sm font-medium uppercase tracking-wider ${isDarkBg ? "text-stone-400" : "text-stone-500"}`}
					>
						— {getLocalizedText(config.author, locale)}
					</cite>
				)}
			</div>
		</section>
	);
}
