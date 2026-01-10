// Channel configuration for the new geolocation-based architecture
// This separates channel (geographic region) from locale (language)

export interface ChannelConfig {
	graphqlChannelName: string;
	supportedLocales: string[];
	defaultLocale: string;
	currency: string;
	region: string;
}

// Complete channel configuration
export const channelConfigs: Record<string, ChannelConfig> = {
	"default-channel": {
		graphqlChannelName: "default-channel",
		supportedLocales: ["nl", "en", "fr"], // NL öncelikli
		defaultLocale: "nl", // NL varsayılan
		currency: "USD",
		region: "US",
	},
	"netherlands-channel": {
		graphqlChannelName: "netherlands-channel",
		supportedLocales: ["nl", "en", "fr"],
		defaultLocale: "nl",
		currency: "EUR",
		region: "NL",
	},
	"belgium-channel": {
		graphqlChannelName: "belgium-channel",
		supportedLocales: ["nl", "fr", "en"], // NL öncelikli
		defaultLocale: "nl", // NL varsayılan
		currency: "EUR",
		region: "BE",
	},
};

// Country to channel mapping for IP geolocation
export const countryToChannel: Record<string, string> = {
	nl: "netherlands-channel", // Netherlands
	be: "belgium-channel", // Belgium
	de: "default-channel", // Germany (fallback)
	fr: "default-channel", // France (fallback)
	us: "default-channel", // USA
	gb: "default-channel", // UK
	ca: "default-channel", // Canada
	au: "default-channel", // Australia
};

// Legacy URL mapping for backward compatibility
export const legacyUrlToChannel: Record<string, { channel: string; locale: string }> = {
	nl: { channel: "netherlands-channel", locale: "nl" },
	fr: { channel: "belgium-channel", locale: "fr" },
	en: { channel: "default-channel", locale: "en" },
	"nl-be": { channel: "belgium-channel", locale: "nl" },
	"fr-be": { channel: "belgium-channel", locale: "fr" },
};

// Default configuration
const defaultChannelConfig: ChannelConfig = channelConfigs["default-channel"];

/**
 * Get channel configuration by channel name
 */
export function getChannelConfig(channelName: string | undefined): ChannelConfig {
	if (!channelName) {
		return defaultChannelConfig;
	}
	return channelConfigs[channelName] || defaultChannelConfig;
}

/**
 * Get channel from country code (for IP geolocation)
 */
export function getChannelFromCountry(countryCode: string): string {
	return countryToChannel[countryCode.toLowerCase()] || "default-channel";
}

/**
 * Check if a locale is supported by a channel
 */
export function isLocaleSupported(channelName: string, locale: string): boolean {
	const config = getChannelConfig(channelName);
	return config.supportedLocales.includes(locale);
}

/**
 * Get best locale for a channel based on browser preferences
 */
export function getBestLocaleForChannel(channelName: string, browserLocales: string[]): string {
	const config = getChannelConfig(channelName);

	// Find first browser locale that's supported by the channel
	const bestMatch = browserLocales.find((locale) => config.supportedLocales.includes(locale));

	return bestMatch || config.defaultLocale;
}

/**
 * Parse Accept-Language header
 */
export function parseAcceptLanguage(acceptLanguage: string): string[] {
	if (!acceptLanguage) return [];

	return acceptLanguage
		.split(",")
		.map((lang) => {
			const [language] = lang.split(";")[0].trim().toLowerCase().split("-");
			return language;
		})
		.filter(Boolean);
}

// LEGACY FUNCTIONS - for backward compatibility
// These will be gradually phased out

/**
 * @deprecated Use getChannelConfig instead
 */
export function getChannelConfigFromChannelName(channelName: string | undefined): {
	graphqlChannelName: string;
	locale: string;
} {
	const config = getChannelConfig(channelName);
	return {
		graphqlChannelName: config.graphqlChannelName,
		locale: config.defaultLocale,
	};
}

/**
 * @deprecated Use legacy URL mapping if needed
 */
export function getChannelConfigFromPath(path: string | undefined): {
	graphqlChannelName: string;
	locale: string;
} {
	if (!path) {
		return {
			graphqlChannelName: defaultChannelConfig.graphqlChannelName,
			locale: defaultChannelConfig.defaultLocale,
		};
	}

	// If the path directly matches a modern channel name (e.g. "netherlands-channel")
	if (channelConfigs[path]) {
		const cfg = channelConfigs[path];
		return {
			graphqlChannelName: cfg.graphqlChannelName,
			locale: cfg.defaultLocale,
		};
	}

	const legacyConfig = legacyUrlToChannel[path.toLowerCase()];
	if (legacyConfig) {
		return {
			graphqlChannelName: legacyConfig.channel,
			locale: legacyConfig.locale,
		};
	}

	return {
		graphqlChannelName: defaultChannelConfig.graphqlChannelName,
		locale: defaultChannelConfig.defaultLocale,
	};
}

/**
 * Get locale from channel name (returns default locale for channel)
 */
export function getLocaleFromChannelName(channelName: string): string {
	const config = getChannelConfig(channelName);
	return config.defaultLocale;
}

/**
 * Convert locale to language code (uppercase)
 */
export function getLanguageCodeFromLocale(locale: string): string {
	return locale.toUpperCase();
}

/**
 * @deprecated Use getChannelConfig and getLanguageCodeFromLocale
 */
export function getLanguageCodeFromChannel(channelName: string): string {
	const config = getChannelConfig(channelName);
	return config.defaultLocale.toUpperCase();
}

/**
 * Generates hreflang alternates for SEO metadata
 * Now works with the new channel-locale separation
 */
export function generateHreflangAlternates(basePath: string, baseUrl?: string): Record<string, string> {
	const alternates: Record<string, string> = {};
	const siteUrl = baseUrl || process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://www.premiummenssuits.com";

	// Ensure basePath starts with /
	const normalizedBasePath = basePath.startsWith("/") ? basePath : `/${basePath}`;

	// Generate alternates for each channel and its supported locales
	for (const channelName in channelConfigs) {
		const config = channelConfigs[channelName];

		// For each supported locale in this channel
		config.supportedLocales.forEach((locale) => {
			// Use channel name in URL (new structure: /netherlands-channel/path?locale=nl)
			const fullUrl = `${siteUrl}/${channelName}${normalizedBasePath}?locale=${locale}`;
			alternates[locale] = fullUrl;
		});
	}

	return alternates;
}
