import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Proxies an external image URL through our local API to avoid CORS issues
 * @param url The original external image URL
 * @returns The proxied URL
 */
export function proxyImage(url: string): string {
  // If the URL is already a relative path or from our own domain, don't proxy it
  if (!url || url.startsWith("/") || url.startsWith(window.location.origin)) {
    return url;
  }

  // For development environment
  if (process.env.NODE_ENV === "development") {
    return `/api/proxy/image?url=${encodeURIComponent(url)}`;
  }

  // For production environment (could include additional logic if needed)
  return `/api/proxy/image?url=${encodeURIComponent(url)}`;
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .replace(/\((\d{4})(?:\s*-\s*)?(?:\d{4})?\)/g, "$1"); // Convert (2025) or (2025-) to just 2025
}

export function fromSlug(slug: string): string {
  return slug
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
}
