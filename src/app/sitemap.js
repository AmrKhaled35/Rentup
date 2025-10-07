import {
  getAgent,
  getBlogs,
  getCategories,
  getCities,
  getMorePages,
  getRecentlyAdded,
} from "@/actions/actions";
import { sitemapRoutes } from "@/constant";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const staticRoutes = sitemapRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const { data: properties } = await getRecentlyAdded(1, 999);
  const allProperties = properties?.map((item) => ({
    url: `${baseUrl}/properties/${item.id}`,
    lastModified: new Date(item.updated_at),
  }));

  const { data: blogs } = await getBlogs(1, 999);
  const allBlogs = blogs?.map((item) => ({
    url: `${baseUrl}/blogs/${item.slug}`,
    lastModified: new Date(item.updated_at),
  }));

  const { data: pages } = await getMorePages();
  const allPages = pages?.map((item) => ({
    url: `${baseUrl}/more/${item.slug}`,
    lastModified: new Date(item.updated_at),
  }));

  const { data: agents } = await getAgent(1, 999);
  const allAgent = agents?.map((item) => ({
    url: `${baseUrl}/agents/${item.id}`,
    lastModified: new Date(item.updated_at),
  }));

  const { data: categories } = await getCategories();
  const { data: cities } = await getCities();

  const generateUrls = (type, items) => {
    return items?.map((item) => ({
      url: `${baseUrl}/filter/${type}/all-city/${item?.category_name
        ?.replace(/\s+/g, "-")
        .replace(/\?/g, "")
        .toLowerCase()}`,
      lastModified: new Date(),
    }));
  };

  const buyCategories = generateUrls("buy", categories);
  const rentCategories = generateUrls("rent", categories);

  const generateNearCityUrls = (type, cities, categories) => {
    return cities?.flatMap((city) =>
      categories?.map((category) => ({
        url: `${baseUrl}/filter/${type}/${city?.city_name
          ?.replace(/\s+/g, "-")
          .replace(/\?/g, "")
          .toLowerCase()}/${category?.category_name
          ?.replace(/\s+/g, "-")
          .replace(/\?/g, "")
          .toLowerCase()}`,
        lastModified: new Date(),
      }))
    );
  };

  const buyNearCity = generateNearCityUrls("buy", cities, categories);
  const rentNearCity = generateNearCityUrls("rent", cities, categories);

  return [
    ...staticRoutes,
    ...allProperties,
    ...allBlogs,
    ...allPages,
    ...allAgent,
    ...buyCategories,
    ...rentCategories,
    ...buyNearCity,
    ...rentNearCity,
  ];
}
