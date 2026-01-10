"use client";

import type { PageConfig, Section } from "@/types/page-config";
import {
	HeroSection,
	StatsSection,
	ProductsSection,
	FeaturesSection,
	StoresSection,
	FAQSection,
	CTASection,
	QuoteSection,
	PricingSection,
	StyleGuideSection,
} from "@/components/sections";

interface Product {
	id: string;
	slug: string;
	name: string;
	translation?: { name: string } | null;
	thumbnail?: { url: string; alt?: string | null } | null;
	pricing?: {
		priceRange?: {
			start?: { gross: { amount: number; currency: string } } | null;
		} | null;
	} | null;
}

interface StyleTemplateProps {
	config: PageConfig;
	channel: string;
	locale: string;
	products: Record<string, Product[]>;
}

export function StyleTemplate({ config, channel, locale, products }: StyleTemplateProps) {
	const { theme, hero, sections, campaign } = config;
	const storeId = config.store?.locations?.[0];

	// Ensure dark mode styling
	const darkTheme = {
		...theme,
		mode: "dark" as const,
	};

	const renderSection = (section: Section, index: number) => {
		switch (section.type) {
			case "stats":
				return (
					<StatsSection
						key={section.id || index}
						config={section.config}
						theme={darkTheme}
						locale={locale}
					/>
				);

			case "products":
				const sectionProducts = products[section.config.collection] || [];
				return (
					<ProductsSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						theme={darkTheme}
						channel={channel}
						locale={locale}
						products={sectionProducts}
					/>
				);

			case "features":
				return (
					<FeaturesSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						animation={section.animation}
						theme={darkTheme}
						locale={locale}
					/>
				);

			case "stores":
				return (
					<StoresSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						theme={darkTheme}
						channel={channel}
						locale={locale}
						campaign={campaign}
					/>
				);

			case "faq":
				return (
					<FAQSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						theme={darkTheme}
						locale={locale}
					/>
				);

			case "cta":
				return (
					<CTASection
						key={section.id || index}
						config={section.config}
						background={section.background || "dark"}
						theme={darkTheme}
						channel={channel}
						locale={locale}
						campaign={campaign}
						store={storeId}
					/>
				);

			case "quote":
				return (
					<QuoteSection
						key={section.id || index}
						config={section.config}
						background={section.background || "dark"}
						animation={section.animation}
						theme={darkTheme}
						locale={locale}
					/>
				);

			case "pricing":
				return (
					<PricingSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						theme={darkTheme}
						locale={locale}
					/>
				);

			case "style-guide":
				return (
					<StyleGuideSection
						key={section.id || index}
						config={section.config}
						title={section.title}
						subtitle={section.subtitle}
						background={section.background || "dark"}
						theme={darkTheme}
						channel={channel}
						locale={locale}
						campaign={campaign}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white">
			{/* Custom CSS variables for accent colors */}
			<style jsx global>{`
				.style-page {
					--accent-color: ${theme.primary || "#c0a062"};
					--accent-color-rgb: ${hexToRgb(theme.primary || "#c0a062")};
				}
			`}</style>

			{/* Hero Section */}
			<HeroSection
				hero={hero}
				theme={darkTheme}
				channel={channel}
				locale={locale}
				campaign={campaign}
				store={storeId}
			/>

			{/* Dynamic Sections */}
			{sections.map((section, index) => renderSection(section, index))}
		</div>
	);
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
	}
	return "192, 160, 98"; // Default gold color
}
