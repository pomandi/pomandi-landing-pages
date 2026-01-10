import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { templates } from "@/templates";
import { getPageConfig, getAllPageConfigs } from "@/lib/getPageConfig";
import { executeGraphQL } from "@/lib/graphql";
import { getChannelConfig, getLanguageCodeFromLocale } from "@/lib/channelMap";
import {
	ProductListByCollectionPaginatedDocument,
	type ProductListByCollectionPaginatedQuery,
	type ProductListByCollectionPaginatedQueryVariables,
	type LanguageCodeEnum,
} from "@/gql/graphql";

interface PageProps {
	params: { channel: string; slug: string[] };
	searchParams: { locale?: string };
}

// Generate static params for all pages
export async function generateStaticParams() {
	const configs = await getAllPageConfigs();
	const params: { channel: string; slug: string[] }[] = [];

	for (const config of configs) {
		for (const channel of config.channels) {
			params.push({
				channel,
				slug: [config.slug],
			});
		}
	}

	return params;
}

// Generate metadata
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
	const slug = params.slug.join("/");
	const config = await getPageConfig(slug);
	const locale = searchParams.locale || "nl";

	if (!config) {
		return { title: "Page Not Found" };
	}

	const title = config.seo.title[locale] || config.seo.title.nl || config.seo.title.en;
	const description =
		config.seo.description[locale] || config.seo.description.nl || config.seo.description.en;

	return {
		title,
		description,
		keywords: config.seo.keywords,
		openGraph: {
			title,
			description,
			images: config.seo.ogImage ? [config.seo.ogImage] : undefined,
			locale: locale === "nl" ? "nl_BE" : locale === "fr" ? "fr_BE" : "en",
			type: "website",
		},
		alternates: {
			canonical: config.seo.canonical,
		},
	};
}

// Fetch products for each collection
async function fetchProducts(
	collections: string[] | undefined,
	channel: string,
	languageCode: LanguageCodeEnum,
): Promise<Record<string, any[]>> {
	if (!collections || collections.length === 0) {
		return {};
	}

	const channelConfig = getChannelConfig(channel);
	const graphqlChannelName = channelConfig.graphqlChannelName;

	const results: Record<string, any[]> = {};

	await Promise.all(
		collections.map(async (collectionSlug) => {
			try {
				const data = await executeGraphQL<
					ProductListByCollectionPaginatedQuery,
					ProductListByCollectionPaginatedQueryVariables
				>(ProductListByCollectionPaginatedDocument, {
					variables: {
						slug: collectionSlug,
						channel: graphqlChannelName,
						languageCode,
						first: 12,
					},
					revalidate: 60,
				});

				results[collectionSlug] = data.collection?.products?.edges.map((e) => e.node) || [];
			} catch (error) {
				console.error(`Failed to fetch collection ${collectionSlug}:`, error);
				results[collectionSlug] = [];
			}
		}),
	);

	return results;
}

// Extract all collection slugs from sections
function extractCollections(config: Awaited<ReturnType<typeof getPageConfig>>): string[] {
	if (!config) return [];

	const collections = new Set<string>();

	// Add collections from config.collections
	if (config.collections) {
		config.collections.forEach((c) => collections.add(c));
	}

	// Add collections from sections
	for (const section of config.sections) {
		if (section.type === "products" && section.config.collection) {
			collections.add(section.config.collection);
		}
	}

	return Array.from(collections);
}

export default async function LandingPage({ params, searchParams }: PageProps) {
	const slug = params.slug.join("/");
	const locale = searchParams.locale || "nl";
	const channel = params.channel;

	// Get page config
	const config = await getPageConfig(slug);

	if (!config) {
		notFound();
	}

	// Verify channel is valid for this page
	if (!config.channels.includes(channel)) {
		notFound();
	}

	// Get template
	const Template = templates[config.template];

	if (!Template) {
		notFound();
	}

	// Get language code
	const languageCode = getLanguageCodeFromLocale(locale) as LanguageCodeEnum;

	// Fetch all products for sections
	const collectionSlugs = extractCollections(config);
	const products = await fetchProducts(collectionSlugs, channel, languageCode);

	return <Template config={config} channel={channel} locale={locale} products={products} />;
}
