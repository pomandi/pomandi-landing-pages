"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroConfig, LocalizedString, ThemeConfig } from "@/types/page-config";

interface HeroSectionProps {
	hero: HeroConfig;
	theme: ThemeConfig;
	channel: string;
	locale: string;
	campaign?: string;
	store?: string;
}

function getLocalizedText(text: LocalizedString, locale: string): string {
	return text[locale] || text.nl || text.en || Object.values(text)[0] || "";
}

export function HeroSection({ hero, theme, channel, locale, campaign, store }: HeroSectionProps) {
	const title = getLocalizedText(hero.title, locale);
	const titleHighlight = hero.titleHighlight ? getLocalizedText(hero.titleHighlight, locale) : null;
	const subtitle = getLocalizedText(hero.subtitle, locale);
	const tagline = hero.tagline ? getLocalizedText(hero.tagline, locale) : null;
	const primaryCTA = getLocalizedText(hero.cta.primary.text, locale);
	const secondaryCTA = hero.cta.secondary ? getLocalizedText(hero.cta.secondary.text, locale) : null;

	const appointmentUrl = `/${channel}/appointment?locale=${locale}${store ? `&shop=${store}` : ""}${campaign ? `&campaign=${campaign}` : ""}`;

	// Animation classes based on hero.animation
	const animationClass =
		hero.animation === "fade-in-up"
			? "animate-fade-in-up"
			: hero.animation === "parallax"
				? "parallax"
				: hero.animation === "fade-in"
					? "animate-fade-in"
					: "";

	if (hero.type === "split") {
		return (
			<section className={`relative ${theme.mode === "dark" ? "bg-[#0a0a0a]" : "bg-[#f8f7f5]"}`}>
				<div className="mx-auto max-w-7xl">
					<div className="grid lg:grid-cols-2">
						{/* Left - Text Content */}
						<div
							className={`flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-24 ${animationClass}`}
						>
							{tagline && (
								<p
									className={`mb-4 text-sm font-medium uppercase tracking-widest ${theme.mode === "dark" ? "text-stone-400" : "text-stone-500"}`}
								>
									{tagline}
								</p>
							)}
							<h1
								className={`mb-6 text-4xl font-light leading-tight sm:text-5xl lg:text-6xl ${theme.mode === "dark" ? "text-white" : "text-stone-900"}`}
							>
								{title}
								{titleHighlight && (
									<span
										className={`block font-normal italic ${theme.mode === "dark" ? "text-stone-300" : "text-stone-700"}`}
									>
										{titleHighlight}
									</span>
								)}
							</h1>
							<p
								className={`mb-8 max-w-md text-lg leading-relaxed ${theme.mode === "dark" ? "text-stone-400" : "text-stone-600"}`}
							>
								{subtitle}
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
								<Link
									href={appointmentUrl}
									className={`inline-flex items-center justify-center rounded-none px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
										hero.cta.primary.style === "outline"
											? `border ${theme.mode === "dark" ? "border-white text-white hover:bg-white hover:text-black" : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"}`
											: `${theme.mode === "dark" ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-stone-800"}`
									}`}
								>
									{primaryCTA}
								</Link>
								{secondaryCTA && (
									<a
										href={`https://www.pomandi.com/default-channel/collections/All-Suits?locale=${locale}`}
										className={`inline-flex items-center justify-center rounded-none border px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
											theme.mode === "dark"
												? "border-white bg-transparent text-white hover:bg-white hover:text-black"
												: "border-stone-900 bg-transparent text-stone-900 hover:bg-stone-900 hover:text-white"
										}`}
									>
										{secondaryCTA}
									</a>
								)}
							</div>
						</div>

						{/* Right - Hero Image Grid */}
						{hero.images && hero.images.length > 0 && (
							<div className="grid grid-cols-2 gap-1">
								{hero.images.slice(0, 4).map((img, i) => (
									<div
										key={i}
										className={`relative aspect-[3/4] overflow-hidden ${theme.mode === "dark" ? "bg-stone-900" : "bg-stone-100"}`}
									>
										<Image
											src={img}
											alt={`${title} ${i + 1}`}
											fill
											className="object-cover object-top transition-transform duration-700 hover:scale-105"
											priority={i < 2}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		);
	}

	if (hero.type === "cinematic" || hero.type === "fullscreen") {
		return (
			<section className="relative min-h-screen overflow-hidden">
				{/* Background Image */}
				{hero.backgroundImage && (
					<div className="absolute inset-0">
						<Image
							src={hero.backgroundImage}
							alt={title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				{/* Overlay */}
				{hero.overlay && (
					<div
						className={`absolute inset-0 ${
							hero.overlay === "dark"
								? "bg-black/60"
								: hero.overlay === "light"
									? "bg-white/40"
									: hero.overlay === "gradient"
										? "bg-gradient-to-t from-black via-black/50 to-transparent"
										: "grain-overlay"
						}`}
					/>
				)}

				{/* Content */}
				<div
					className={`relative flex min-h-screen flex-col items-center justify-center px-6 text-center ${animationClass}`}
				>
					{tagline && (
						<p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
							{tagline}
						</p>
					)}
					<h1 className="mb-6 text-5xl font-light leading-tight text-white sm:text-6xl lg:text-7xl">
						{title}
						{titleHighlight && (
							<span className="gold-shimmer mt-2 block font-normal italic">{titleHighlight}</span>
						)}
					</h1>
					<p className="mb-10 max-w-2xl text-lg leading-relaxed text-stone-300">{subtitle}</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<Link
							href={appointmentUrl}
							className="inline-flex items-center justify-center rounded-none bg-white px-10 py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-stone-200"
						>
							{primaryCTA}
						</Link>
						{secondaryCTA && (
							<a
								href={`https://www.pomandi.com/default-channel/collections/All-Suits?locale=${locale}`}
								className="inline-flex items-center justify-center rounded-none border border-white/30 px-10 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
							>
								{secondaryCTA}
							</a>
						)}
					</div>
				</div>
			</section>
		);
	}

	// Default: gradient hero
	return (
		<section
			className="relative min-h-[70vh] overflow-hidden"
			style={{
				background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.primary}20 100%)`,
			}}
		>
			<div className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
				<h1 className="mb-6 text-4xl font-light text-white sm:text-5xl lg:text-6xl">{title}</h1>
				<p className="mb-8 max-w-xl text-lg text-stone-300">{subtitle}</p>
				<Link
					href={appointmentUrl}
					className="inline-flex items-center justify-center rounded-none bg-white px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-stone-200"
				>
					{primaryCTA}
				</Link>
			</div>
		</section>
	);
}
