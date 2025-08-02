import { BlogSection } from "@/components/organisms/home/blogSection";
import { ContactSection } from "@/components/organisms/home/contactSection";
import { Hero } from "@/components/organisms/home/Hero";
import { MusicSection } from "@/components/organisms/home/MusicSection";
import { ScheduleSection } from "@/components/organisms/home/scheduleSection";
import { AppDownloadSection } from "@/components/organisms/home/AppDownloadSection";
import { FlashySection } from "@/components/organisms/home/FlashySection";
import { AdsManager } from "@/components/organisms/ads/AdsManager";
import { AdDebugger } from "@/components/debug/AdDebugger";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SCHEDULE_QUERY, POSTS_QUERY, RADIO_STATION_QUERY } from "@/sanity/lib/queries/homeQueries";
import type { HomePageData, ScheduleData, BlogPost, RadioStationData } from "@/types/sanity";

export default async function Home() {
  const [homePageData, scheduleData, postsData, radioStationData] = await Promise.all([
    sanityFetch({
      query: HOME_PAGE_QUERY,
    }),
    sanityFetch({
      query: SCHEDULE_QUERY,
    }),
    sanityFetch({
      query: POSTS_QUERY,
      params: { limit: 6 },
    }),
    sanityFetch({
      query: RADIO_STATION_QUERY,
    }),
  ]);

  const homePage = homePageData.data as HomePageData | null;
  const schedule = scheduleData.data as ScheduleData | null;
  const posts = postsData.data as BlogPost[] | null;
  const radioStation = radioStationData.data as RadioStationData | null;

  return (
    <div className="min-h-screen bg-background ">
      <Hero data={homePage?.heroSection} />

      {/* Ad Placement - Header */}
      <AdsManager adsData={homePage?.googleAds} placement="header" />

      <MusicSection
        data={homePage?.musicSection}
        radioStationData={radioStation}
      />

      {/* Ad Placement - Content Top */}
      <AdsManager adsData={homePage?.googleAds} placement="content-top" />

      {/* Flashy Sections */}
      {homePage?.flashySections?.map((section, index) => (
        <FlashySection key={index} data={section} />
      ))}

      {/* Ad Placement - Content Middle */}
      <AdsManager adsData={homePage?.googleAds} placement="content-middle" />

      <ScheduleSection
        data={homePage?.scheduleSection}
        scheduleData={schedule}
      />

      {/* Ad Placement - Between Sections */}
      <AdsManager adsData={homePage?.googleAds} placement="between-sections" />

      <BlogSection data={homePage?.blogSection} posts={posts || []} />

      <AppDownloadSection data={homePage?.appDownloadSection} />

      {/* Ad Placement - Content Bottom */}
      <AdsManager adsData={homePage?.googleAds} placement="content-bottom" />

      <ContactSection data={homePage?.contactSection} />

      {/* Ad Placement - Footer */}
      <AdsManager adsData={homePage?.googleAds} placement="footer" />

      {/* Ad Debugger - Remove this in production */}
      {/* <AdDebugger adsData={homePage?.googleAds} /> */}
    </div>
  );
}
