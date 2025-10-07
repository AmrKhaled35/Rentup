"use client";

import { useEffect, useRef } from "react";

/* interface AdProps {
  adUnit: string
  sizes: [number, number][]
  sizeMapping?: Array<{ viewportSize: [number, number]; sizes: [number, number][] }>
  className?: string
}

declare global {
  interface Window {
    googletag: any
  }
} */

const Ad = ({
  adUnit = "/6355419/Travel/Europe/France/Paris",
  sizes = [
    [750, 200],
    [728, 90],
    [300, 250],
  ],
  sizeMapping,
  /*  = [
    {
      viewportSize: [1024, 0],
      sizes: [
        [728, 90],
        [750, 200],
      ],
    },
    { viewportSize: [768, 0], sizes: [[300, 250]] },
    { viewportSize: [0, 0], sizes: [[320, 50]] },
  ], */
  className,
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    const googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];

    googletag.cmd.push(() => {
      const slot = googletag
        .defineSlot(adUnit, sizes, adRef.current?.id)
        ?.addService(googletag.pubads());

      if (sizeMapping && slot) {
        const mapping = googletag.sizeMapping();
        sizeMapping.forEach(({ viewportSize, sizes }) => {
          mapping.addSize(viewportSize, sizes);
        });
        slot.defineSizeMapping(mapping.build());
      }

      googletag.enableServices();
      googletag.display(adRef.current?.id);
    });

    return () => {
      googletag.cmd.push(() => {
        googletag.destroySlots();
      });
    };
  }, [adUnit, sizes, sizeMapping]);

  return (
    <div
      ref={adRef}
      id={`gpt-ad-${adUnit}`}
      className={`flex justify-center items-center ${className}`}
    />
  );
};

export default Ad;
