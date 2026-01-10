import type { Metadata } from "next";
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
			<body className="antialiased">{children}</body>
		</html>
	);
}
