import { defineQuery } from "next-sanity";

// Categories Query
export const CATEGORIES_QUERY = defineQuery(`*[_type == 'category'] | order(title asc) {
  _id,
  title,
  slug,
  description
}`);

// All Posts Query with Search and Filtering
export const ALL_POSTS_QUERY = defineQuery(`*[_type == 'post' && defined(slug.current)
  && ($search == "" || title match $search + "*" || pt::text(body) match $search + "*")
  && ($category == "" || $category in categories[]->slug.current)
] | order(publishedAt desc)[$offset...$limit] {
  _id,
  title,
  slug,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  author-> {
    _id,
    name,
    image {
      asset,
      alt
    }
  },
  publishedAt,
  body[0...3]
}`);

// Single Post Query
export const SINGLE_POST_QUERY = defineQuery(`*[_type == 'post' && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug,
    description
  },
  author-> {
    _id,
    name,
    slug,
    image {
      asset,
      alt
    },
    bio
  },
  publishedAt,
  _createdAt,
  _updatedAt,
  _rev
}`);

// Related Posts Query
export const RELATED_POSTS_QUERY = defineQuery(`*[_type == 'post' 
  && slug.current != $currentSlug 
  && defined(slug.current)
  && count(categories[@._ref in $categoryIds]) > 0
] | order(publishedAt desc)[0...4] {
  _id,
  title,
  slug,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  author-> {
    _id,
    name
  },
  publishedAt,
  body[0...1]
}`);

// Posts Count Query for Pagination
export const POSTS_COUNT_QUERY = defineQuery(`count(*[_type == 'post' && defined(slug.current)
  && ($search == "" || title match $search + "*" || pt::text(body) match $search + "*")
  && ($category == "" || $category in categories[]->slug.current)
])`);

// Featured Posts Query
export const FEATURED_POSTS_QUERY = defineQuery(`*[_type == 'post' && defined(slug.current)] 
  | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  author-> {
    _id,
    name
  },
  publishedAt
}`);
