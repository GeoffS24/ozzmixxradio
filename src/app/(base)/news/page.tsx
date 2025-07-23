import type { Metadata } from "next";
import { NewsListing } from "@/components/organisms/news/NewsListing";
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
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const currentPage = parseInt(searchParams.page || "1");
  const postsPerPage = 12;
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";

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
    </div>
  );
}
