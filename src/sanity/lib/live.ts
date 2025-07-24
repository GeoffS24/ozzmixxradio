import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "../env";

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
  }),
  serverToken: token,
  browserToken: token,
});
