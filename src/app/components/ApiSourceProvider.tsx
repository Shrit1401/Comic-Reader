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

// Simplified provider that always uses the default source
export function ApiSourceProvider({ children }: { children: ReactNode }) {
  // Fixed value for default source
  const apiSource: ApiSource = "default";

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
