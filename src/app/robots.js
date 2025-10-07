/* eslint-disable react-hooks/rules-of-hooks */
import { disallowRoutes, sitemapRoutes } from "@/constant";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: sitemapRoutes,
      disallow: disallowRoutes,
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
