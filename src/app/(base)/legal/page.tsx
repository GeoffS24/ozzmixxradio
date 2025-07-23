import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileText, Calendar, ArrowRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { LEGAL_PAGES_QUERY } from "@/sanity/lib/queries/legalQueries";
import { Button } from "@/components/atoms/ui/Button";
import { Breadcrumb } from "@/components/molecules/navigation/Breadcrumb";
import type { LegalPage } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Legal Information - OZZ Dance Radio",
  description: "Access our legal documents including Privacy Policy, Terms of Service, and Cookie Policy for OZZ Dance Radio.",
  keywords: ["legal", "privacy policy", "terms of service", "cookie policy", "OZZ Dance Radio"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Legal Information - OZZ Dance Radio",
    description: "Access our legal documents including Privacy Policy, Terms of Service, and Cookie Policy.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Legal Information - OZZ Dance Radio",
    description: "Access our legal documents including Privacy Policy, Terms of Service, and Cookie Policy.",
  },
};

export default async function LegalIndexPage() {
  // Fetch all published legal pages
  const legalPagesData = await sanityFetch({
    query: LEGAL_PAGES_QUERY,
  });

  const legalPages = legalPagesData.data as LegalPage[] | null;

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get page type display name
  const getPageTypeDisplay = (pageType: string) => {
    const typeMap = {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      disclaimer: 'Disclaimer',
      dmca: 'DMCA Policy',
      other: 'Legal Document',
    };
    return typeMap[pageType as keyof typeof typeMap] || 'Legal Document';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-5 py-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Legal Information', isActive: true },
            ]}
          />
        </div>
      </nav>

      {/* Page Header */}
      <header className="container mx-auto px-5 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            <Scale className="w-4 h-4" />
            Legal Information
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
            Legal Documents
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our comprehensive legal documents to understand how we protect your privacy, 
            our terms of service, and how we use cookies on our website.
          </p>
        </div>
      </header>

      {/* Legal Pages Grid */}
      <section className="container mx-auto px-5 pb-16">
        <div className="max-w-6xl mx-auto">
          {legalPages && legalPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {legalPages.map((page) => (
                <article
                  key={page._id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Page Type Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    <FileText className="w-3 h-3" />
                    {getPageTypeDisplay(page.pageType || 'other')}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {page.title}
                  </h2>

                  {/* Description */}
                  {page.metaDescription && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {page.metaDescription}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground mb-6">
                    {page.effectiveDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Effective: {formatDate(page.effectiveDate)}</span>
                      </div>
                    )}
                    {page.version && (
                      <div className="flex items-center gap-2">
                        <span>Version {page.version}</span>
                      </div>
                    )}
                  </div>

                  {/* Read More Button */}
                  <Link href={`/legal/${page.slug?.current}`}>
                    <Button variant="outline" size="sm" className="w-full group">
                      Read Document
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Scale className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Legal Documents Available
              </h3>
              <p className="text-muted-foreground">
                Legal documents are currently being prepared and will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Questions About Our Legal Policies?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about our legal documents or need clarification 
              on any of our policies, please don&apos;t hesitate to contact us.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
