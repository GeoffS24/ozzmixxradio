import Link from 'next/link'
import { Calendar, FileText, ArrowLeft, Scale } from 'lucide-react'
import { PortableText } from '@/components/molecules/content/PortableText'
import { Button } from '@/components/atoms/ui/Button'
import { Breadcrumb } from '@/components/molecules/navigation/Breadcrumb'
import type { LegalPage } from '@/types/sanity'

interface LegalPageDetailProps {
  page: LegalPage
}

export function LegalPageDetail({ page }: LegalPageDetailProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get page type display name
  const getPageTypeDisplay = (pageType: string) => {
    const typeMap = {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      disclaimer: 'Disclaimer',
      dmca: 'DMCA Policy',
      other: 'Legal Document',
    }
    return typeMap[pageType as keyof typeof typeMap] || 'Legal Document'
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-5 py-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Legal', href: '/legal' },
              { label: page.title || 'Legal Document', isActive: true },
            ]}
          />
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-5 py-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <header className="container mx-auto px-5 mb-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Type Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              <Scale className="w-3 h-3" />
              {getPageTypeDisplay(page.pageType || 'other')}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
            {page.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            {page.effectiveDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Effective: {formatDate(page.effectiveDate)}</span>
              </div>
            )}
            {page.lastUpdated && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Last Updated: {formatDate(page.lastUpdated)}</span>
              </div>
            )}
            {page.version && (
              <div className="flex items-center gap-2">
                <span>Version {page.version}</span>
              </div>
            )}
          </div>

          {/* Jurisdiction Notice */}
          {page.jurisdiction && (
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Legal Jurisdiction:</strong> This document is governed by the laws of {page.jurisdiction}.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-5 mb-16">
        <div className="max-w-4xl mx-auto">
          <PortableText 
            value={page.content || []} 
            className="prose prose-lg lg:prose-xl max-w-none"
          />
        </div>
      </div>

      {/* Contact Information */}
      {page.contactEmail && (
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Questions About This Policy?
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this {getPageTypeDisplay(page.pageType || 'other').toLowerCase()}, 
                please contact us.
              </p>
              <Link href={`mailto:${page.contactEmail}`}>
                <Button variant="primary" size="md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Document Information Footer */}
      <footer className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Document Version</h4>
                <p>Version {page.version}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Effective Date</h4>
                <p>{page.effectiveDate ? formatDate(page.effectiveDate) : 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Last Updated</h4>
                <p>{page.lastUpdated ? formatDate(page.lastUpdated) : 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </article>
  )
}
