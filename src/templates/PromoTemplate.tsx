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

interface PromoTemplateProps {
	config: PageConfig;
	channel: string;
	locale: string;
	products: Record<string, Product[]>;
}

export function PromoTemplate({ config, channel, locale, products }: PromoTemplateProps) {
	const { theme, hero, sections, campaign } = config;
	const storeId = config.store?.locations?.[0];

	const renderSection = (section: Section, index: number) => {
		switch (section.type) {
			case "stats":
				return (
					<StatsSection
						key={section.id || index}
						config={section.config}
						theme={theme}
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
						background={section.background}
						theme={theme}
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
						background={section.background}
						animation={section.animation}
						theme={theme}
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
						background={section.background}
						theme={theme}
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
						background={section.background}
						theme={theme}
						locale={locale}
					/>
				);

			case "cta":
				return (
					<CTASection
						key={section.id || index}
						config={section.config}
						background={section.background}
						theme={theme}
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
						background={section.background}
						animation={section.animation}
						theme={theme}
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
						background={section.background}
						theme={theme}
						locale={locale}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<div className={`min-h-screen ${theme.mode === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
			{/* Promo Banner (if defined) */}
			{config.promo && (
				<div
					className="sticky top-0 z-50 py-3 text-center text-sm font-medium"
					style={{ backgroundColor: theme.accent || theme.primary, color: "#fff" }}
				>
					{config.promo.badge && (
						<span className="mr-2 rounded bg-white/20 px-2 py-1 text-xs uppercase">
							{config.promo.badge[locale] || config.promo.badge.nl}
						</span>
					)}
					{config.promo.message?.[locale] || config.promo.message?.nl}
					{config.promo.endDate && (
						<span className="ml-2 opacity-80">
							{locale === "fr" ? "Jusqu'au" : "Tot"} {config.promo.endDate}
						</span>
					)}
				</div>
			)}

			{/* Hero Section */}
			<HeroSection
				hero={hero}
				theme={theme}
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
