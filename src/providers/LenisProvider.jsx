"use client";

import { ReactLenis } from "lenis/react";

const LenisProvider = ({ children }) => {
  const options = {
    duration: 1.5,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
