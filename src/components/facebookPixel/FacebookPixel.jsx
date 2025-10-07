"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const FacebookPixel = ({id}) => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    window.fbq("track", "PageView");
  }, [pathname, loaded]);

  useEffect(() => {
    const event = (name, options = {}) => {
      window.fbq("track", name, options);
    };

    window.event = event;
  }, []);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={id}
      />
    </div>
  );
};

export default FacebookPixel;