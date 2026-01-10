import Link from "next/link";
import Image from "next/image";
import type { StyleGuideSection as StyleGuideSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface StyleGuideSectionProps {
	config: StyleGuideSectionConfig["config"];
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

export function StyleGuideSection({
	config,
	title,
	subtitle,
	background,
	theme,
	channel,
	locale,
	campaign,
}: StyleGuideSectionProps) {
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
		<section className={`relative overflow-hidden ${bgClass} py-24`}>
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Left - Image Collage */}
					{config.images && config.images.length > 0 && (
						<div className="relative">
							<div className="grid grid-cols-2 gap-4">
								{config.images.slice(0, 2).map((img, i) => (
									<div
										key={i}
										className={`relative overflow-hidden ${i === 1 ? "mt-12" : ""}`}
										style={{ aspectRatio: "3/4" }}
									>
										<Image
											src={img}
											alt={`Style ${i + 1}`}
											fill
											className="object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
										/>
										<div
											className={`absolute inset-0 bg-gradient-to-t from-[${theme.background}] via-transparent to-transparent`}
										/>
									</div>
								))}
							</div>
							{/* Decorative frame */}
							<div
								className="absolute -bottom-4 -left-4 -right-4 -top-4 -z-10 border"
								style={{ borderColor: `${accentColor}33` }}
							/>
						</div>
					)}

					{/* Right - Content */}
					<div>
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
								className={`mb-6 text-3xl font-light sm:text-4xl ${isDarkBg ? "text-white" : "text-stone-900"}`}
							>
								{getLocalizedText(title, locale)}
							</h2>
						)}
						{config.intro && (
							<p
								className={`mb-8 text-lg leading-relaxed ${isDarkBg ? "text-stone-400" : "text-stone-600"}`}
							>
								{getLocalizedText(config.intro, locale)}
							</p>
						)}

						{config.tips && config.tips.length > 0 && (
							<ul className="mb-10 space-y-4">
								{config.tips.map((tip, i) => (
									<li key={i} className="flex items-start gap-4">
										<span
											className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs"
											style={{ borderColor: `${accentColor}80`, color: accentColor }}
										>
											{i + 1}
										</span>
										<span className={isDarkBg ? "text-stone-300" : "text-stone-700"}>
											{getLocalizedText(tip, locale)}
										</span>
									</li>
								))}
							</ul>
						)}

						{config.cta && (
							<Link
								href={`/${channel}/appointment?locale=${locale}${campaign ? `&campaign=${campaign}` : ""}`}
								className="inline-flex items-center gap-3 border-b pb-1 text-sm font-medium uppercase tracking-widest transition-colors"
								style={{
									borderColor: accentColor,
									color: accentColor,
								}}
							>
								{getLocalizedText(config.cta, locale)}
								<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
