"use client"

import Script from 'next/script'

interface IubendaConsentProps {
  siteId?: string
  cookiePolicyId?: string
}

export function IubendaConsent({ 
  siteId = "3826516", 
  cookiePolicyId = "12345678" 
}: IubendaConsentProps) {
  return (
    <>
      {/* Iubenda Cookie Solution */}
      <Script
        id="iubenda-cs-configuration"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": ${siteId},
              "cookiePolicyId": ${cookiePolicyId},
              "lang": "en",
              "storage": {
                "useSiteId": true
              },
              "banner": {
                "acceptButtonDisplay": true,
                "customizeButtonDisplay": true,
                "position": "bottom",
                "acceptButtonColor": "#0073CE",
                "acceptButtonCaptionColor": "white",
                "customizeButtonColor": "#DADADA",
                "customizeButtonCaptionColor": "#4D4D4D",
                "rejectButtonColor": "#0073CE",
                "rejectButtonCaptionColor": "white",
                "textColor": "#000000",
                "backgroundColor": "#FFFFFF"
              },
              "callback": {
                "onConsentGiven": function() {
                  // Dispatch custom event when consent is given
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('iubenda_consent_given'));
                    window.dispatchEvent(new Event('iubenda_consent_given_purpose_1'));
                  }
                }
              }
            };
          `
        }}
      />
      
      <Script
        src="https://cs.iubenda.com/autoblocking/3826516.js"
        strategy="afterInteractive"
      />
      
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
        async
      />
    </>
  )
}
