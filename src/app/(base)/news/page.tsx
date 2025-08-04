import type { Metadata } from "next";
import { NewsListing } from "@/components/organisms/news/NewsListing";
import { NewsListingStructuredData } from "@/components/molecules/seo/NewsListingStructuredData";
import { ShowPlayerButton } from "@/components/atoms/ui/ShowPlayerButton";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries/homeQueries";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries/newsQueries";
import type { BlogPost, Category } from "@/types/sanity";

export const metadata: Metadata = {
  title: "News & Blog - OZZ Dance Radio",
  description: "Stay updated with the latest music industry insights, artist interviews, and radio news from OZZ Dance Radio.",
  keywords: ["music news", "dance music", "electronic music", "artist interviews", "radio news", "music industry"],
};

interface NewsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { search, category, page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const postsPerPage = 12;
  const searchQuery = search || "";
  const categoryFilter = category || "";

  const [postsData, categoriesData] = await Promise.all([
    sanityFetch({
      query: POSTS_QUERY,
      params: { 
        limit: postsPerPage * 3, 
        search: searchQuery,
        category: categoryFilter,
      },
    }),
    sanityFetch({
      query: CATEGORIES_QUERY,
    }),
  ]);

  const posts = postsData.data as BlogPost[] | null;
  const categories = categoriesData.data as Category[] | null;

  return (
    <div className="min-h-screen bg-background">
      <NewsListing
        posts={posts || []}
        categories={categories || []}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
      />
      <NewsListingStructuredData
        posts={posts || []}
        currentPage={currentPage}
        baseUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://ozzmixxradio.com/'}
      />
      <ShowPlayerButton />
    </div>
  );
}
