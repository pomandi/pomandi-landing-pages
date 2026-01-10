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

interface LocationTemplateProps {
	config: PageConfig;
	channel: string;
	locale: string;
	products: Record<string, Product[]>;
}

export function LocationTemplate({ config, channel, locale, products }: LocationTemplateProps) {
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

			default:
				return null;
		}
	};

	return (
		<div className={`min-h-screen ${theme.mode === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
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
