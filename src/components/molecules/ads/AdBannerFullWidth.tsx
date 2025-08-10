"use client";

import { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  defaultFullWidthResponsive: boolean;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBannerFullWidth = ({
  dataAdSlot,
  dataAdFormat,
  defaultFullWidthResponsive = true
}: AdBannerTypes) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current?.getAttribute("data-ad-status") === "filled") {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Ad push error:", error);
    }
  }, [dataAdSlot]);

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
