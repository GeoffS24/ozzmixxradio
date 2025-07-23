import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageDetail } from "@/components/organisms/legal/LegalPageDetail";
import { sanityFetch } from "@/sanity/lib/live";
import { LEGAL_PAGE_QUERY } from "@/sanity/lib/queries/legalQueries";
import type { LegalPage } from "@/types/sanity";
import { LegalPageStructuredData } from "@/components/molecules/seo/LegalPageStructuredData";

interface LegalPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const pageData = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { slug: params.slug },
  });

  const page = pageData.data as LegalPage | null;

  if (!page) {
    return {
      title: "Legal Document Not Found - OZZ Dance Radio",
      description: "The requested legal document could not be found.",
    };
  }

  const pageTypeDisplay = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    disclaimer: 'Disclaimer',
    dmca: 'DMCA Policy',
    other: 'Legal Document',
  }[page.pageType || 'other'] || 'Legal Document';

  return {
    title: `${page.title} - OZZ Dance Radio`,
    description: page.metaDescription || `Read our ${pageTypeDisplay.toLowerCase()} to understand how we handle your data and our service terms.`,
    keywords: [
      'legal',
      'policy',
      page.pageType || 'legal',
      'OZZ Dance Radio',
      ...(page.seoKeywords || []),
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription || `${pageTypeDisplay} for OZZ Dance Radio`,
      type: 'article',
      publishedTime: page.effectiveDate,
      modifiedTime: page.lastUpdated,
      siteName: 'OZZ Dance Radio',
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description: page.metaDescription || `${pageTypeDisplay} for OZZ Dance Radio`,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/legal/${params.slug}`,
    },
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  // Fetch the legal page
  const pageData = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { slug: params.slug },
  });

  const page = pageData.data as LegalPage | null;

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <LegalPageDetail page={page} />
      <LegalPageStructuredData 
        page={page} 
        baseUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://ozzmixxradio.com/'} 
      />
    </div>
  );
}
