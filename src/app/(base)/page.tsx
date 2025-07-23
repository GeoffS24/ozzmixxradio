import { BlogSection } from "@/components/organisms/home/blogSection";
import { ContactSection } from "@/components/organisms/home/contactSection";
import { Hero } from "@/components/organisms/home/Hero";
import { MusicSection } from "@/components/organisms/home/MusicSection";
import { ScheduleSection } from "@/components/organisms/home/scheduleSection";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SCHEDULE_QUERY, POSTS_QUERY } from "@/sanity/lib/queries/homeQueries";
import type { HomePageData, ScheduleData, BlogPost } from "@/types/sanity";

export default async function Home() {
  const [homePageData, scheduleData, postsData] = await Promise.all([
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
  ]);

  const homePage = homePageData.data as HomePageData | null;
  const schedule = scheduleData.data as ScheduleData | null;
  const posts = postsData.data as BlogPost[] | null;

  return (
    <div className="min-h-screen bg-background">
      <Hero data={homePage?.heroSection} />
      <MusicSection data={homePage?.musicSection} />
      <ScheduleSection
        data={homePage?.scheduleSection}
        scheduleData={schedule}
      />
      <BlogSection data={homePage?.blogSection} posts={posts || []} />
      <ContactSection data={homePage?.contactSection} />
    </div>
  );
}
