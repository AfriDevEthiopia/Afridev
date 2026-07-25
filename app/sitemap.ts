import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.afridev.io";
  const locales = ["en", "zh", "es", "am", "om"];

  const routes = locales.map((locale) => ({
    url: locale === "en" ? `${baseUrl}` : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1.0 : 0.8,
  }));

  return routes;
}
