import type { StoreLocation } from "@/types/page-config";

export type { StoreLocation };

export const stores: Record<string, StoreLocation> = {
	brasschaat: {
		id: "brasschaat",
		name: "Pomandi Brasschaat",
		address: "Bredabaan 299",
		city: "2930 Brasschaat",
		phone: "+32 3 369 60 12",
		whatsapp: "+32489107182",
		email: "info@pomandi.com",
		hours: {
			nl: "Ma-Za: 10:00 - 18:00",
			fr: "Lun-Sam: 10:00 - 18:00",
			en: "Mon-Sat: 10:00 - 18:00",
		},
		mapUrl: "https://goo.gl/maps/...",
		mapEmbed:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.0!2d4.4912!3d51.2917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4094b1c15f5e1%3A0x4a5c0b8c4d5e6f7g!2sBredabaan%20299%2C%202930%20Brasschaat!5e0!3m2!1snl!2sbe!4v1234567890",
	},
	genk: {
		id: "genk",
		name: "Pomandi Genk",
		address: "Vennestraat 331",
		city: "3600 Genk",
		phone: "+32 489 10 71 82",
		whatsapp: "+32489107182",
		email: "info@pomandi.com",
		hours: {
			nl: "Ma-Za: 10:00 - 18:00",
			fr: "Lun-Sam: 10:00 - 18:00",
			en: "Mon-Sat: 10:00 - 18:00",
		},
		mapUrl: "https://goo.gl/maps/...",
		mapEmbed:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.0!2d5.5012!3d50.9617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4094b1c15f5e1%3A0x4a5c0b8c4d5e6f7g!2sVennestraat%20331%2C%203600%20Genk!5e0!3m2!1snl!2sbe!4v1234567890",
	},
};

export function getStore(storeId: string): StoreLocation | undefined {
	return stores[storeId];
}

export function getStores(storeIds: string[]): StoreLocation[] {
	return storeIds.map((id) => stores[id]).filter(Boolean) as StoreLocation[];
}
