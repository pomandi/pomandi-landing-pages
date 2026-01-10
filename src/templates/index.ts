import { LocationTemplate } from "./LocationTemplate";
import { StyleTemplate } from "./StyleTemplate";
import { PromoTemplate } from "./PromoTemplate";
import type { TemplateType } from "@/types/page-config";

export const templates: Record<TemplateType, typeof LocationTemplate | typeof StyleTemplate | typeof PromoTemplate> = {
	location: LocationTemplate,
	style: StyleTemplate,
	promo: PromoTemplate,
};

export { LocationTemplate, StyleTemplate, PromoTemplate };
