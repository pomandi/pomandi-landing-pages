import Image from "next/image";
import type { ProductSection, LocalizedString, ThemeConfig } from "@/types/page-config";

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

interface ProductsSectionProps {
	config: ProductSection["config"];
	title?: LocalizedString;
	subtitle?: LocalizedString;
	background?: string;
	theme: ThemeConfig;
	channel: string;
	locale: string;
	products: Product[];
}

function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return "";
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function ProductsSection({
	config,
	title,
	subtitle,
	background,
	theme,
	channel,
	locale,
	products,
}: ProductsSectionProps) {
	if (products.length === 0) return null;

	const bgClass =
		background === "primary"
			? theme.mode === "dark"
				? "bg-stone-900"
				: "bg-[#f8f7f5]"
			: background === "secondary"
				? theme.mode === "dark"
					? "bg-[#0a0a0a]"
					: "bg-white"
				: theme.mode === "dark"
					? "bg-[#0a0a0a]"
					: "bg-white";

	const gridCols =
		config.columns === 2
			? "grid-cols-2"
			: config.columns === 3
				? "grid-cols-2 md:grid-cols-3"
				: config.columns === 6
					? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
					: "grid-cols-2 md:grid-cols-4";

	return (
		<section className={`${bgClass} py-20`}>
			<div className="mx-auto max-w-7xl px-6">
				{(title || subtitle) && (
					<div className="mb-10 flex items-end justify-between">
						<div>
							{subtitle && (
								<p
									className={`mb-2 text-sm font-medium uppercase tracking-wider ${theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}`}
								>
									{getLocalizedText(subtitle, locale)}
								</p>
							)}
							{title && (
								<h2
									className={`text-3xl font-light ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
								>
									{getLocalizedText(title, locale)}
								</h2>
							)}
						</div>
						<a
							href={`https://www.pomandi.com/${channel}/collections/${config.collection}?locale=${locale}`}
							className={`hidden items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors sm:inline-flex ${theme.mode === "dark" ? "text-white hover:text-stone-300" : "text-stone-900 hover:text-stone-600"}`}
						>
							{locale === "nl" ? "Bekijk alles" : locale === "fr" ? "Voir tout" : "View all"}
							<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
					</div>
				)}

				<div className={`grid ${gridCols} gap-4`}>
					{products.slice(0, config.limit || 8).map((product) => (
						<a
							key={product.id}
							href={`https://www.pomandi.com/${channel}/products/${product.slug}?locale=${locale}`}
							className="group"
						>
							<div
								className={`relative aspect-[3/4] overflow-hidden ${theme.mode === "dark" ? "bg-stone-800" : "bg-stone-100"}`}
							>
								{product.thumbnail ? (
									<Image
										src={product.thumbnail.url}
										alt={product.translation?.name || product.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<span className="text-4xl text-stone-400">&#128084;</span>
									</div>
								)}
								<div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
							</div>
							<div className="mt-3">
								<p
									className={`text-sm font-medium ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
								>
									{product.translation?.name || product.name}
								</p>
								{config.showPrice && product.pricing?.priceRange?.start?.gross && (
									<p
										className={`text-sm ${theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}`}
									>
										{new Intl.NumberFormat(locale === "nl" ? "nl-BE" : "fr-BE", {
											style: "currency",
											currency: product.pricing.priceRange.start.gross.currency,
										}).format(product.pricing.priceRange.start.gross.amount)}
									</p>
								)}
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
