import type { MetadataRoute } from "next";

const routes = ["", "/qr-code-whatsapp", "/qr-code-link", "/converter", "/calculadora-margem"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://siteprafarmarcash-production.up.railway.app";

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.8 : 1,
  }));
}
