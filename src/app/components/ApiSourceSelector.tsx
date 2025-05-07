"use client";

import { useApiSource } from "./ApiSourceProvider";

export default function ApiSourceSelector() {
  const { apiSource, setApiSource } = useApiSource();

  return (
    <div className="flex items-center">
      <label className="mr-4 font-medium">Data Source:</label>
      <div className="flex gap-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="default-source"
            name="api-source"
            checked={apiSource === "default"}
            onChange={() => setApiSource("default")}
            className="mr-2"
          />
          <label htmlFor="default-source">Default API</label>
        </div>
      </div>
    </div>
  );
}
