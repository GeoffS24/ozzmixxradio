import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "../env";

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
    perspective: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? 'previewDrafts' : 'published',
    useCdn: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview',
    stega: {
      enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    },
  }),
  serverToken: token,
  browserToken: token,
});
