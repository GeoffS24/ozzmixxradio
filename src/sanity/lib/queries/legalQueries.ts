import { defineQuery } from "next-sanity";

// Get all published legal pages
export const LEGAL_PAGES_QUERY = defineQuery(`*[_type == 'legalPage' && status == 'published'] | order(pageType asc) {
  _id,
  title,
  slug,
  pageType,
  metaDescription,
  effectiveDate,
  lastUpdated,
  version
}`);

// Get single legal page by slug
export const LEGAL_PAGE_QUERY = defineQuery(`*[_type == 'legalPage' && slug.current == $slug && status == 'published'][0] {
  _id,
  title,
  slug,
  pageType,
  metaDescription,
  content,
  effectiveDate,
  lastUpdated,
  version,
  contactEmail,
  jurisdiction,
  seoKeywords,
  status
}`);

// Get legal pages for footer (published only)
export const FOOTER_LEGAL_PAGES_QUERY = defineQuery(`*[_type == 'legalPage' && status == 'published'] | order(pageType asc) {
  _id,
  title,
  slug,
  pageType
}`);

// Get legal page by type (privacy, terms, cookies)
export const LEGAL_PAGE_BY_TYPE_QUERY = defineQuery(`*[_type == 'legalPage' && pageType == $pageType && status == 'published'][0] {
  _id,
  title,
  slug,
  pageType,
  metaDescription,
  content,
  effectiveDate,
  lastUpdated,
  version,
  contactEmail,
  jurisdiction,
  seoKeywords
}`);

// Get all legal page versions (for admin/tracking)
export const LEGAL_PAGE_VERSIONS_QUERY = defineQuery(`*[_type == 'legalPage' && slug.current == $slug] | order(lastUpdated desc) {
  _id,
  title,
  version,
  status,
  effectiveDate,
  lastUpdated,
  _createdAt
}`);
