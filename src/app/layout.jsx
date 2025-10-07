import { Rubik, Outfit, Cairo } from "next/font/google"; 
import "./globals.css";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
});
import Footer from "@/components/shared/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import FacebookPixel from "@/components/facebookPixel/FacebookPixel";
import { NextIntlClientProvider } from "next-intl";
import {
  getAppSettings,
  getFavPro,
  getHeroSection,
  getMorePages,
  getToken,
  getUser,
} from "@/actions/actions";
import { getLocale, getMessages } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import GPT from "@/components/ads/GPT";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cairo = Cairo({ subsets: ["latin", "arabic"], variable: "--font-cairo" }); 

export const generateMetadata = async () => {
  const { data } = await getAppSettings();
  const title = data?.appSetting?.site_title || "";
  const description = data?.appSetting?.meta_description;

  return {
    title: {
      template: `${title} | %s`,
      default: title,
    },
    description,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();
  const messages = await getMessages();
  const token = await getToken();

  const [
    { data: appSetting },
    { data: morePages },
    { data: userFav },
    { data: general },
    { data: user },
  ] = await Promise.all([
    getAppSettings(),
    getMorePages(),
    getFavPro(),
    getHeroSection(),
    getUser(),
  ]);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${rubik.variable} ${outfit.variable} ${cairo.variable} font-cairo text-dark bg-whiteFc`} 
      >
        <GPT />
        <NextIntlClientProvider messages={messages}>
          <AuthProvider
            currency={appSetting?.currency || {}}
            token={token}
            favProperties={userFav}
          >
            <Navbar links={morePages} logo={general?.logo} user={user} />

            {children}

            <Footer links={morePages} />

            <GoogleAnalytics
              gaId={appSetting?.appSetting?.google_analytics_id}
            />
            <FacebookPixel id={appSetting?.appSetting?.facebook_pixel_id} />
            <Toaster />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
