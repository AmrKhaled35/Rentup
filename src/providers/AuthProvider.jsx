"use client";

import AuthContext from "@/contexts/AuthContext";
import { useMemo } from "react";

const AuthProvider = ({ children, currency, token, favProperties }) => {
  const favIds = useMemo(
    () => favProperties?.map((item) => item.id),
    [favProperties]
  );

  const value = {
    token,
    currency,
    favProperties,
    favIds,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
