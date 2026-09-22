import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://visideax.com";
  const routes = [
    "",
    "/why-us",
    "/how-we-work",
    "/insights",
    "/careers",
    "/annual-report",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
