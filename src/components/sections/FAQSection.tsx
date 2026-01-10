"use client";

import type { FAQSection as FAQSectionConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface FAQSectionProps {
	config: FAQSectionConfig["config"];
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

export function FAQSection({ config, title, subtitle, background, theme, locale }: FAQSectionProps) {
	const bgClass =
		background === "primary"
			? theme.mode === "dark"
				? "bg-stone-900"
				: "bg-[#f8f7f5]"
			: theme.mode === "dark"
				? "bg-[#0a0a0a]"
				: "bg-white";

	return (
		<section className={`${bgClass} py-20`}>
			<div className="mx-auto max-w-3xl px-6">
				{(title || subtitle) && (
					<div className="mb-12 text-center">
						{title && (
							<h2
								className={`mb-4 text-3xl font-light ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
							>
								{getLocalizedText(title, locale)}
							</h2>
						)}
						{subtitle && (
							<p className={theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}>
								{getLocalizedText(subtitle, locale)}
							</p>
						)}
					</div>
				)}

				<div
					className={`divide-y ${theme.mode === "dark" ? "divide-stone-700" : "divide-stone-200"}`}
				>
					{config.items.map((faq, i) => (
						<details key={i} className="group py-6">
							<summary
								className={`flex cursor-pointer items-center justify-between text-lg font-medium ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
							>
								{getLocalizedText(faq.question, locale)}
								<svg
									className={`h-5 w-5 transition-transform group-open:rotate-180 ${theme.mode === "dark" ? "text-stone-400" : "text-stone-400"}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</summary>
							<p className={`mt-4 ${theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}`}>
								{getLocalizedText(faq.answer, locale)}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
