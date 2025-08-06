import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { sanityFetch } from "@/sanity/lib/live";
import { RADIO_STATION_QUERY } from "@/sanity/lib/queries/homeQueries";
import { RadioStationData } from "@/types";
import { SEOTags } from "@/components/molecules/seo/SEOTags";
import { RadioPlayerProvider } from "@/contexts/RadioPlayerContext";
import { PersistentMiniPlayer } from "@/components/organisms/media/PersistentMiniPlayer";
import { IubendaConsent } from "@/components/molecules/consent/IubendaConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const stationData = await sanityFetch({
    query: RADIO_STATION_QUERY,
  });

  const station = stationData.data as RadioStationData | null;
  const seoSettings = station?.seoSettings;

  return {
    title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
    description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
    keywords: seoSettings?.keywords || ["dance music", "electronic music", "radio station"],
    authors: [{ name: station?.title || "OZZ Dance Radio" }],
    verification: {
      google: "QPRuL3txllBLq1VHKyOnUznD9if4QlYkn3oK96Jd9K0",
    },
    openGraph: {
      title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
      description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
      type: "website",
      siteName: station?.title || "OZZ Dance Radio",
    },
    twitter: {
      card: "summary_large_image",
      title: seoSettings?.metaTitle || station?.title || "OZZ Dance Radio",
      description: seoSettings?.metaDescription || station?.description || "Your favorite dance music station",
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
  // Fetch radio station data for global player
  const { data: stationData } = await sanityFetch({
    query: RADIO_STATION_QUERY,
  });

  return (
    <html lang="en">
      <head>
        <SEOTags canonicalUrl={process.env.NEXT_PUBLIC_SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IubendaConsent />
        <RadioPlayerProvider
          streamUrl={stationData?.radioConfig?.streamUrl || 'https://stream.ozzmixxradio.com/hls/ozzmixxradio/live.m3u8'}
          statusApiUrl={stationData?.radioConfig?.statusApiUrl || 'https://stream.ozzmixxradio.com/api/nowplaying'}
          defaultVolume={stationData?.radioConfig?.defaultVolume || 50}
          autoPlay={stationData?.radioConfig?.autoPlay || false}
        >
          <main>{children}</main>
          <PersistentMiniPlayer />
        </RadioPlayerProvider>
      </body>
    </html>
  );
}


export const revalidate = 1500;