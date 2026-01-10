import Link from "next/link";
import { getAllPageConfigs } from "@/lib/getPageConfig";

export default async function HomePage() {
	const configs = await getAllPageConfigs();

	return (
		<div className="min-h-screen bg-stone-50 py-12">
			<div className="mx-auto max-w-4xl px-6">
				<h1 className="mb-8 text-4xl font-light text-stone-900">Pomandi Landing Pages</h1>
				<p className="mb-8 text-stone-600">
					This is the landing pages app for Pomandi. Below are the configured pages:
				</p>

				<div className="space-y-4">
					{configs.length === 0 ? (
						<p className="text-stone-500">No pages configured yet.</p>
					) : (
						configs.map((config) => (
							<div
								key={config.slug}
								className="rounded-lg border border-stone-200 bg-white p-4"
							>
								<h2 className="mb-2 text-lg font-medium text-stone-900">{config.slug}</h2>
								<p className="mb-3 text-sm text-stone-500">
									Template: {config.template} | Channels: {config.channels.join(", ")}
								</p>
								<div className="flex flex-wrap gap-2">
									{config.channels.map((channel) => (
										<Link
											key={`${config.slug}-${channel}`}
											href={`/${channel}/${config.slug}`}
											className="text-sm text-blue-600 hover:underline"
										>
											/{channel}/{config.slug}
										</Link>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
