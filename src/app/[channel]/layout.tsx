import type { ReactNode } from "react";

interface ChannelLayoutProps {
	children: ReactNode;
	params: { channel: string };
}

export default function ChannelLayout({ children }: ChannelLayoutProps) {
	// TODO: Add shared Header and Footer components here
	// For now, just render children
	return <>{children}</>;
}
