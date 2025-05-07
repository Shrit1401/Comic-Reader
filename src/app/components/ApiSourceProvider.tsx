"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { ApiSource, setApiSource as setGlobalApiSource } from "@/services/api";

// Create the API source context
interface ApiSourceContextType {
  apiSource: ApiSource;
  setApiSource: (source: ApiSource) => void;
}

const ApiSourceContext = createContext<ApiSourceContextType | undefined>(
  undefined
);

// Provider component
export function ApiSourceProvider({ children }: { children: ReactNode }) {
  // Default source is "default"
  const [apiSource, setApiSourceState] = useState<ApiSource>("default");

  // Initialize from localStorage on component mount (client-side only)
  useEffect(() => {
    const savedSource = localStorage.getItem(
      "comicApiSource"
    ) as ApiSource | null;
    if (savedSource && savedSource === "default") {
      setApiSourceState(savedSource);
      setGlobalApiSource(savedSource);
    }
  }, []);

  // Function to update API source both in context and global service
  const setApiSource = (source: ApiSource) => {
    setApiSourceState(source);
    setGlobalApiSource(source);
    localStorage.setItem("comicApiSource", source);
  };

  return (
    <ApiSourceContext.Provider value={{ apiSource, setApiSource }}>
      {children}
    </ApiSourceContext.Provider>
  );
}

// Custom hook for using the API source
export function useApiSource() {
  const context = useContext(ApiSourceContext);
  if (context === undefined) {
    throw new Error("useApiSource must be used within an ApiSourceProvider");
  }
  return context;
}
