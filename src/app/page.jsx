import {
  getAboutUs,
  getAdUnitIds,
  getAgent,
  getBlogs,
  getCategories,
  getFavorite,
  getFeatured,
  getPopular,
  getPopularCities,
  getRecentlyAdded,
} from "@/actions/actions";
import Ad from "@/components/ads/Ad";
import AboutUs from "@/components/home/AboutUs";
import DiscoverAllTypes from "@/components/home/DiscoverAllTypes";
import FavoriteProperties from "@/components/home/FavoriteProperties";
import FeaturedListings from "@/components/home/FeaturedListings";
import Hero from "@/components/home/Hero";
import LatestBlog from "@/components/home/LatestBlog";
import OurAdvantage from "@/components/home/OurAdvantage";
import OurAgent from "@/components/home/OurAgent";
import PopularCities from "@/components/home/PopularCities";
import PopularProperties from "@/components/home/PopularProperties";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import SubscriptionPlan from "@/components/home/SubscriptionPlan";
import Testimonial from "@/components/home/Testimonial";

const Home = async () => {
  const categoriesData = getCategories(4);
  const recentlyAddedData = getRecentlyAdded(1, 6);
  const popularCitiesData = getPopularCities(4);
  const featuredListingsData = getFeatured(1, 4);
  const popularListingsData = getPopular(1, 4);
  const favoriteListingsData = getFavorite(1, 4);
  const blogsData = getBlogs(1, 3);
  const aboutUsData = getAboutUs();
  const agentData = getAgent(1, 4);

  const [
    featuredListings,
    categories,
    popularListings,
    popularCities,
    favoriteListings,
    recentlyAdded,
    agent,
    aboutUs,
    blogs,
    { data: adUnitIds },
  ] = await Promise.all([
    featuredListingsData,
    categoriesData,
    popularListingsData,
    popularCitiesData,
    favoriteListingsData,
    recentlyAddedData,
    agentData,
    aboutUsData,
    blogsData,
    getAdUnitIds(),
  ]);

  return (
    <main>
      <Hero />
      <FeaturedListings data={featuredListings.data} />
      <DiscoverAllTypes data={categories.data} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <Ad/><Ad/><Ad/><Ad/>
      </div>
      <PopularProperties data={popularListings.data} />
      <PopularCities data={popularCities.data} />
      <FavoriteProperties data={favoriteListings.data} />
      <RecentlyAdded data={recentlyAdded.data} />
      <OurAgent data={agent.data} />
      <OurAdvantage data={OurAdvantage.data} />
      <AboutUs data={aboutUs.data} />
      {/* <SubscriptionPlan /> */}
      {/* <LatestBlog data={blogs.data} /> */}
      <Testimonial />
    </main>
  );
};

export default Home;
