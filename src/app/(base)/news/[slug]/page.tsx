import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetail } from "@/components/organisms/news/NewsDetail";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_POST_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries/newsQueries";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPost } from "@/types/sanity";
import { ArticleStructuredData } from "@/components/molecules/seo/ArticleStructuredData";

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await sanityFetch({
    query: SINGLE_POST_QUERY,
    params: { slug },
  });

  const post = postData.data as BlogPost | null;

  if (!post) {
    return {
      title: "Post Not Found - OZZ Dance Radio",
      description: "The requested post could not be found.",
    };
  }

  const excerpt = post.body?.find((block: any) => block._type === 'block')?.children
    ?.filter((child: any) => child._type === 'span')
    ?.map((child: any) => child.text)
    ?.join(' ')
    ?.substring(0, 160) || 'Read the latest music industry insights from OZZ Dance Radio.';

  // Generate article image URL for social sharing
  const articleImageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;

  return {
    title: `${post.title} - OZZ Dance Radio`,
    description: excerpt,
    keywords: [
      'music news',
      'dance music',
      'electronic music',
      ...(post.categories?.map(cat => cat.title).filter((title): title is string => Boolean(title)) || []),
    ],
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.categories?.map(cat => cat.title).filter((title): title is string => Boolean(title)) || [],
      images: articleImageUrl ? [
        {
          url: articleImageUrl,
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title || 'Article image',
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: articleImageUrl ? [articleImageUrl] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  // Fetch the post
  const postData = await sanityFetch({
    query: SINGLE_POST_QUERY,
    params: { slug },
  });

  const post = postData.data as BlogPost | null;

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories?.map(cat => cat._id) || [];
  const relatedPostsData = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: {
      currentSlug: slug,
      categoryIds,
    },
  });

  const relatedPosts = relatedPostsData.data as BlogPost[] | null;

  return (
    <div className="min-h-screen bg-background">
      <NewsDetail
        post={post}
        relatedPosts={relatedPosts || []}
      />
      <ArticleStructuredData
        post={post}
        baseUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://ozzmixxradio.com/'}
      />
    </div>
  );
}
