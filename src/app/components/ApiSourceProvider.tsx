"use client";

import { createContext, useContext, ReactNode } from "react";
import { ApiSource } from "@/services/api";

// Create a simplified context for backward compatibility
interface ApiSourceContextType {
  apiSource: ApiSource;
}

const ApiSourceContext = createContext<ApiSourceContextType | undefined>(
  undefined
);

// Simplified provider that always uses the unified source
export function ApiSourceProvider({ children }: { children: ReactNode }) {
  // Fixed value for unified source
  const apiSource: ApiSource = "unified";

  return (
    <ApiSourceContext.Provider value={{ apiSource }}>
      {children}
    </ApiSourceContext.Provider>
  );
}

// Custom hook for using the API source - kept for backward compatibility
export function useApiSource() {
  const context = useContext(ApiSourceContext);
  if (context === undefined) {
    throw new Error("useApiSource must be used within an ApiSourceProvider");
  }
  return context;
}
