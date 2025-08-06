"use client";

import { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  defaultFullWidthResponsive: boolean;
};

declare global {
  interface Window {
    _iub: any;
    adsbygoogle: any[];
  }
}

const AdBannerFullWidth = ({
  dataAdSlot,
  dataAdFormat,
  defaultFullWidthResponsive = true
}: AdBannerTypes) => {
  const adRef = useRef<HTMLModElement>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  // Check for consent
  useEffect(() => {
    const handleConsentGiven = () => {
      setConsentGiven(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('iubenda_consent_given', handleConsentGiven);
      window.addEventListener('iubenda_consent_given_purpose_1', handleConsentGiven);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('iubenda_consent_given', handleConsentGiven);
        window.removeEventListener('iubenda_consent_given_purpose_1', handleConsentGiven);
      }
    };
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    if (adRef.current?.getAttribute("data-ad-status") === "filled") {
      return;
    }
    try {
      ((window as any).adsbygoogle =
        (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("Ad push error:", error);
    }
  }, [consentGiven, dataAdSlot]);

  if (!consentGiven) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "2000px",
        margin: "0 auto"
      }}>
      <ins
        ref={adRef}
        key={dataAdSlot}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-4257061841065510"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={defaultFullWidthResponsive.toString()}></ins>
    </div>
  );
};

export default AdBannerFullWidth;
