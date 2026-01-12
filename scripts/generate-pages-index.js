#!/usr/bin/env node
/**
 * Generate pages-index.json for admin page
 * This runs at build time to create a static index of all landing pages
 */

const fs = require("fs");
const path = require("path");

const CONFIG_DIR = path.join(__dirname, "../src/config/pages");
const OUTPUT_FILE = path.join(__dirname, "../public/pages-index.json");

function generatePagesIndex() {
  console.log("Generating pages index...");

  if (!fs.existsSync(CONFIG_DIR)) {
    console.error("Config directory not found:", CONFIG_DIR);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ pages: [], generated: new Date().toISOString() }));
    return;
  }

  const files = fs.readdirSync(CONFIG_DIR).filter((f) => f.endsWith(".json"));
  console.log(`Found ${files.length} page configs`);

  const pages = files.map((file) => {
    try {
      const filePath = path.join(CONFIG_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const config = JSON.parse(content);

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
      console.error(`Error parsing ${file}:`, err.message);
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

  const output = {
    pages,
    total: pages.length,
    generated: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`Generated ${OUTPUT_FILE} with ${pages.length} pages`);
}

generatePagesIndex();
