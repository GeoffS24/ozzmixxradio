import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/layout/header/navigation";
import { Footer } from "@/components/organisms/layout/footer/footer";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/molecules/presentation/disableDraftMode";
import { sanityFetch } from "@/sanity/lib/live";
import { RADIO_STATION_QUERY } from "@/sanity/lib/queries/homeQueries";
import type { RadioStationData } from "@/types/sanity";
import { AnalyticsScript } from "@/components/molecules/seo/AnalyticsScript";
import { StructuredData } from "@/components/molecules/seo/StructuredData";
import { urlFor } from "@/sanity/lib/image";
import { VisualEditing } from "next-sanity";

export async function generateMetadata(): Promise<Metadata> {
  const stationData = await sanityFetch({
    query: RADIO_STATION_QUERY,
  });

  const station = stationData.data as RadioStationData | null;
  const seoSettings = station?.seoSettings;

  const ogImageUrl = seoSettings?.ogImage?.asset?._ref
    ? urlFor(seoSettings.ogImage).width(1200).height(630).url()
    : null;

  return {
    title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
    description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
    keywords: seoSettings?.keywords || ["dance music", "electronic music", "radio station"],
    authors: [{ name: station?.title || "OZZ Dance Radio" }],
    openGraph: {
      title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
      description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
      type: "website",
      siteName: station?.title || "OZZ Dance Radio",
      images: ogImageUrl ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seoSettings?.ogImage?.alt || `${station?.title || "OZZ Dance Radio"} - Social Media Image`,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
      description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  const stationData = await sanityFetch({
    query: RADIO_STATION_QUERY,
  });

  const station = stationData.data as RadioStationData | null;

  return (
    <>
      <Navigation />
      <main>
        {children}
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </main>
      <Footer stationData={station} />
      <AnalyticsScript analytics={station?.analytics} />
      <StructuredData stationData={station} />
    </>
  );
}
