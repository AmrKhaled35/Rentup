import Script from "next/script";

const GPT = () => {
  return (
    <Script
      async
      src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default GPT;
