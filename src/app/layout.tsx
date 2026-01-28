import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
	title: "Pomandi Landing Pages",
	description: "Premium maatpakken en kostuums",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="nl">
			<head>
				{/* Preconnect for third-party services - improves loading performance */}
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<link rel="preconnect" href="https://www.google-analytics.com" />
				<link rel="preconnect" href="https://googleads.g.doubleclick.net" />
				<link rel="preconnect" href="https://connect.facebook.net" />

				{/* ADVANCED CONSENT MODE V2 - Must load BEFORE any Google tags */}
				<Script
					id="gtag-consent-default"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}

							// ADVANCED CONSENT MODE V2 - Default denied with Advanced features
							gtag('consent', 'default', {
								'analytics_storage': 'denied',
								'ad_storage': 'denied',
								'ad_user_data': 'denied',
								'ad_personalization': 'denied',
								'functionality_storage': 'denied',
								'personalization_storage': 'denied',
								'security_storage': 'granted',
								'ads_data_redaction': false,
								'url_passthrough': true,
								'wait_for_update': 500
							});

							// Region-specific: Full consent for non-EU visitors
							gtag('consent', 'default', {
								'analytics_storage': 'granted',
								'ad_storage': 'granted',
								'ad_user_data': 'granted',
								'ad_personalization': 'granted',
								'region': ['US', 'CA', 'AU', 'NZ', 'JP', 'KR', 'SG', 'AE', 'TR']
							});

							window.gtag = gtag;
						`,
					}}
				/>

				{/* Google Tag Manager / GA4 / Google Ads - Load after interactive to reduce blocking */}
				<Script
					id="gtag-js"
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-3W8JMTNRLQ"
				/>
				<Script
					id="gtag-config"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							gtag('js', new Date());

							// GA4 Configuration (Measurement ID: G-3W8JMTNRLQ)
							gtag('config', 'G-3W8JMTNRLQ', {
								'send_page_view': true,
								'cookie_flags': 'SameSite=None;Secure',
								'allow_google_signals': true,
								'allow_ad_personalization_signals': true
							});

							// Set global site properties - Landing Pages identifier
							gtag('set', 'user_properties', {
								'site_version': 'new_site_2025',
								'site_platform': 'nextjs_landing_pages',
								'site_domain': 'pomandi.com'
							});

							// Google Ads Configuration (AW-700170344)
							// Enhanced conversions enabled for better attribution
							gtag('config', 'AW-700170344', {
								'allow_enhanced_conversions': true,
								'send_page_view': true
							});

							// Google Ads Remarketing - with new site identifier
							gtag('event', 'page_view', {
								'send_to': 'AW-700170344',
								'site_version': 'new_site_2025',
								'value': 0,
								'items': []
							});
						`,
					}}
				/>

				{/* Signals Gateway Pixel Code */}
				<Script
					id="signals-gateway-pixel"
					strategy="lazyOnload"
					dangerouslySetInnerHTML={{
						__html: `
							!function(a,h,e,v,n,t,s)
							{if(a.cbq)return;n=a.cbq=function(){n.callMethod?
							n.callMethod.apply(n,arguments):n.queue.push(arguments)};
							if(!a._cbq)a._cbq=n;n.push=n;n.loaded=!0;n.version='2.0';
							n.queue=[];t=h.createElement(e);t.async=!0;
							t.src=v;s=h.getElementsByTagName(e)[0];
							s.parentNode.insertBefore(t,s)}(window, document,'script',
							'https://d2yghe65l2gkk3.cloudfront.net/sdk/1066609136041486620/events.js');
							cbq('setHost', 'https://d2yghe65l2gkk3.cloudfront.net/');
							cbq('init', '1066609136041486620');

							// Capture FBCLID from URL for Meta Ads attribution
							var urlParams = new URLSearchParams(window.location.search);
							var fbclid = urlParams.get('fbclid');
							if (fbclid) {
								try { localStorage.setItem('fbclid', fbclid); } catch(e) {}
								window._fbclid = fbclid;
							} else {
								try { fbclid = localStorage.getItem('fbclid'); window._fbclid = fbclid; } catch(e) {}
							}

							var pvEventId = Date.now() + '_' + Math.random().toString(36).substring(2, 11);
							window._pvEventId = pvEventId;

							// Send PageView with FBCLID for attribution
							var pvData = {event_id: pvEventId};
							if (fbclid) { pvData.fbc = 'fb.1.' + Date.now() + '.' + fbclid; }
							cbq('track', 'PageView', pvData);
						`,
					}}
				/>

				{/* Meta (Facebook) Pixel - Advanced Mode */}
				<Script
					id="meta-pixel"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							!function(f,b,e,v,n,t,s)
							{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
							n.callMethod.apply(n,arguments):n.queue.push(arguments)};
							if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
							n.queue=[];t=b.createElement(e);t.async=!0;
							t.src=v;s=b.getElementsByTagName(e)[0];
							s.parentNode.insertBefore(t,s)}(window, document,'script',
							'https://connect.facebook.net/en_US/fbevents.js');

							// Check if cookie consent was already given
							var hasConsent = document.cookie.indexOf('cookie_consent=accepted') !== -1;

							if (hasConsent) {
								fbq('consent', 'grant');
							} else {
								fbq('consent', 'revoke');
							}

							fbq('init', '1401950721206832', {}, {
								'agent': 'pomandi-landing-pages'
							});

							var pvEventId = window._pvEventId || (Date.now() + '_' + Math.random().toString(36).substring(2, 11));
							fbq('track', 'PageView', {}, {eventID: pvEventId});

							window.fbq = fbq;
						`,
					}}
				/>
				<noscript>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						src="https://www.facebook.com/tr?id=1401950721206832&ev=PageView&noscript=1"
						alt=""
					/>
				</noscript>
			</head>
			<body className="antialiased">{children}</body>
		</html>
	);
}
