import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface PageConfig {
  slug: string;
  template: string;
  campaign?: string;
  channels?: string[];
  generated_at?: string;
  seo?: {
    title?: {
      nl?: string;
      fr?: string;
      en?: string;
    };
  };
  hero?: {
    title?: {
      nl?: string;
      fr?: string;
      en?: string;
    };
  };
}

export async function GET() {
  try {
    const configDir = path.join(process.cwd(), "src/config/pages");

    // Check if directory exists
    if (!fs.existsSync(configDir)) {
      return NextResponse.json({ pages: [], error: "Config directory not found" });
    }

    // Read all JSON files
    const files = fs.readdirSync(configDir).filter((f) => f.endsWith(".json"));

    const pages = files.map((file) => {
      try {
        const filePath = path.join(configDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const config: PageConfig = JSON.parse(content);

        return {
          slug: config.slug || file.replace(".json", ""),
          title: config.hero?.title?.nl || config.seo?.title?.nl || config.slug || "",
          template: config.template || "unknown",
          campaign: config.campaign || "",
          channels: config.channels || [],
          generatedAt: config.generated_at || "",
          seoTitle: config.seo?.title?.nl || "",
        };
      } catch (err) {
        console.error(`Error parsing ${file}:`, err);
        return {
          slug: file.replace(".json", ""),
          title: file.replace(".json", ""),
          template: "error",
          campaign: "",
          channels: [],
          generatedAt: "",
          seoTitle: "",
        };
      }
    });

    // Sort by slug
    pages.sort((a, b) => a.slug.localeCompare(b.slug));

    return NextResponse.json({
      pages,
      total: pages.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { pages: [], error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
