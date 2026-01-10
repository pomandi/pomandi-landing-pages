import fs from "fs";
import path from "path";
import type { PageConfig } from "@/types/page-config";

const CONFIG_DIR = path.join(process.cwd(), "src/config/pages");

/**
 * Get page configuration by slug
 */
export async function getPageConfig(slug: string): Promise<PageConfig | null> {
	try {
		const filePath = path.join(CONFIG_DIR, `${slug}.json`);

		if (!fs.existsSync(filePath)) {
			return null;
		}

		const fileContent = fs.readFileSync(filePath, "utf-8");
		const config = JSON.parse(fileContent) as PageConfig;

		return config;
	} catch (error) {
		console.error(`Error loading page config for ${slug}:`, error);
		return null;
	}
}

/**
 * Get all page configurations
 */
export async function getAllPageConfigs(): Promise<PageConfig[]> {
	try {
		if (!fs.existsSync(CONFIG_DIR)) {
			return [];
		}

		const files = fs.readdirSync(CONFIG_DIR).filter((file) => file.endsWith(".json"));

		const configs = files.map((file) => {
			const filePath = path.join(CONFIG_DIR, file);
			const fileContent = fs.readFileSync(filePath, "utf-8");
			return JSON.parse(fileContent) as PageConfig;
		});

		return configs;
	} catch (error) {
		console.error("Error loading page configs:", error);
		return [];
	}
}

/**
 * Get all page slugs (for static generation)
 */
export async function getAllPageSlugs(): Promise<string[]> {
	try {
		if (!fs.existsSync(CONFIG_DIR)) {
			return [];
		}

		const files = fs.readdirSync(CONFIG_DIR).filter((file) => file.endsWith(".json"));

		return files.map((file) => file.replace(".json", ""));
	} catch (error) {
		console.error("Error loading page slugs:", error);
		return [];
	}
}
