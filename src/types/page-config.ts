// Landing Page Configuration Types

export type TemplateType = "location" | "style" | "promo";

export type HeroType = "split" | "fullscreen" | "cinematic" | "gradient" | "video";

export type OverlayType = "gradient" | "dark" | "light" | "grain" | "none";

export type AnimationType = "fade-in" | "fade-in-up" | "slide-up" | "stagger" | "parallax" | "zoom" | "none";

export type BackgroundType = "primary" | "secondary" | "dark" | "light" | "gradient" | "white";

export type SectionType =
	| "products"
	| "features"
	| "faq"
	| "stores"
	| "testimonials"
	| "cta"
	| "quote"
	| "pricing"
	| "timeline"
	| "gallery"
	| "stats"
	| "style-guide"
	| "split-content"
	| "usp-strip";

export type LocalizedString = Record<string, string>; // { nl: "...", fr: "...", en: "..." }

// Theme Configuration
export interface ThemeConfig {
	mode: "light" | "dark";
	primary: string; // "#c0a062" (gold), "#8b0000" (red)
	secondary?: string;
	background: string; // "#0a0a0a", "#f8f7f5"
	accent?: string;
	customCSS?: string; // Page-specific CSS
}

// SEO Configuration
export interface SEOConfig {
	title: LocalizedString;
	description: LocalizedString;
	keywords: string[];
	canonical: string;
	ogImage?: string;
}

// CTA Button Configuration
export interface CTAButton {
	text: LocalizedString;
	href?: string; // Optional - defaults to appointment page
	style?: "solid" | "outline" | "ghost";
}

// Hero Configuration
export interface HeroConfig {
	type: HeroType;
	title: LocalizedString;
	titleHighlight?: LocalizedString; // Italic/emphasized part
	subtitle: LocalizedString;
	tagline?: LocalizedString;
	images?: string[];
	backgroundImage?: string;
	videoUrl?: string;
	overlay?: OverlayType;
	animation?: AnimationType;
	cta: {
		primary: CTAButton;
		secondary?: CTAButton;
	};
}

// Base Section Configuration
export interface BaseSection {
	type: SectionType;
	id: string;
	title?: LocalizedString;
	subtitle?: LocalizedString;
	animation?: AnimationType;
	background?: BackgroundType;
}

// Product Section
export interface ProductSection extends BaseSection {
	type: "products";
	config: {
		collection: string; // Saleor collection slug
		limit?: number;
		style?: "grid" | "carousel" | "featured";
		columns?: 2 | 3 | 4 | 6;
		showPrice?: boolean;
	};
}

// Features Section
export interface FeatureItem {
	icon?: string;
	title: LocalizedString;
	description: LocalizedString;
}

export interface FeaturesSection extends BaseSection {
	type: "features";
	config: {
		columns?: 2 | 3 | 4;
		style?: "cards" | "minimal" | "bordered" | "icons";
		items: FeatureItem[];
	};
}

// FAQ Section
export interface FAQItem {
	question: LocalizedString;
	answer: LocalizedString;
}

export interface FAQSection extends BaseSection {
	type: "faq";
	config: {
		items: FAQItem[];
	};
}

// Store Locations Section
export interface StoresSection extends BaseSection {
	type: "stores";
	config: {
		locations: string[]; // ['brasschaat', 'genk']
		style?: "cards" | "list" | "map" | "minimal";
		showMap?: boolean;
		showHours?: boolean;
		showWhatsApp?: boolean;
	};
}

// Testimonials Section
export interface TestimonialItem {
	quote: LocalizedString;
	author: string;
	location?: string;
	rating?: number;
}

export interface TestimonialsSection extends BaseSection {
	type: "testimonials";
	config: {
		items: TestimonialItem[];
		style?: "cards" | "slider" | "grid";
	};
}

// CTA Section
export interface CTASection extends BaseSection {
	type: "cta";
	config: {
		title: LocalizedString;
		subtitle?: LocalizedString;
		button: CTAButton;
		style?: "centered" | "split" | "banner";
	};
}

// Quote Section
export interface QuoteSection extends BaseSection {
	type: "quote";
	config: {
		text: LocalizedString;
		author?: LocalizedString;
		style?: "centered" | "large" | "with-icon";
	};
}

// Pricing Section
export interface PricingItem {
	name: LocalizedString;
	price: string;
	description?: LocalizedString;
}

export interface PricingSection extends BaseSection {
	type: "pricing";
	config: {
		items: PricingItem[];
		note?: LocalizedString;
	};
}

// Timeline Section (e.g., jaren-20-pak)
export interface TimelineItem {
	year: string;
	title: LocalizedString;
	description: LocalizedString;
	image?: string;
}

export interface TimelineSection extends BaseSection {
	type: "timeline";
	config: {
		items: TimelineItem[];
		style?: "alternating" | "left" | "right";
	};
}

// Gallery Section
export interface GallerySection extends BaseSection {
	type: "gallery";
	config: {
		images: string[];
		layout?: "masonry" | "grid" | "carousel";
		lightbox?: boolean;
		columns?: 2 | 3 | 4;
	};
}

// Stats Section
export interface StatItem {
	value: string;
	label: LocalizedString;
}

export interface StatsSection extends BaseSection {
	type: "stats";
	config: {
		items: StatItem[];
	};
}

// USP Strip Section
export interface USPStripSection extends BaseSection {
	type: "usp-strip";
	config: {
		items: StatItem[];
	};
}

// Style Guide Section
export interface StyleGuideSection extends BaseSection {
	type: "style-guide";
	config: {
		intro?: LocalizedString;
		tips?: LocalizedString[];
		images?: string[];
		cta?: LocalizedString;
	};
}

// Split Content Section
export interface SplitContentSection extends BaseSection {
	type: "split-content";
	config: {
		title: LocalizedString;
		description: LocalizedString;
		features?: LocalizedString[];
		image: string;
		imagePosition?: "left" | "right";
		cta?: CTAButton;
	};
}

// Union type for all sections
export type Section =
	| ProductSection
	| FeaturesSection
	| FAQSection
	| StoresSection
	| TestimonialsSection
	| CTASection
	| QuoteSection
	| PricingSection
	| TimelineSection
	| GallerySection
	| StatsSection
	| USPStripSection
	| StyleGuideSection
	| SplitContentSection;

// Store Location Data
export interface StoreLocation {
	id: string;
	name: string;
	address: string;
	city: string;
	phone: string;
	email?: string;
	whatsapp?: string;
	hours: LocalizedString;
	mapUrl?: string;
	mapEmbed?: string;
}

// Main Page Configuration
export interface PageConfig {
	slug: string;
	template: TemplateType;
	channels: string[]; // ['belgium-channel', 'netherlands-channel']

	// Theme
	theme: ThemeConfig;

	// SEO
	seo: SEOConfig;

	// Hero
	hero: HeroConfig;

	// Sections
	sections: Section[];

	// Products
	collections?: string[]; // Saleor collection slugs

	// Store
	store?: {
		locations: string[];
		showMap?: boolean;
		showHours?: boolean;
		showWhatsApp?: boolean;
	};

	// Campaign tracking
	campaign?: string;

	// Promo (for promo template)
	promo?: {
		badge?: LocalizedString;
		message?: LocalizedString;
		endDate?: string;
		discount?: string;
	};
}
