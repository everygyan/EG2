/**
 * Shared formatting utilities for EveryGyan
 * Provides standardized, consistent human-readable date and reading time formatting.
 */

/**
 * Formats any date input (string, Date, timestamp) into standard human-readable format:
 * "Oct 18, 2026"
 */
export function formatArticleDate(dateInput: string | Date | number | undefined | null): string {
  if (!dateInput) return "Recent";

  if (typeof dateInput === "string") {
    const trimmed = dateInput.trim();
    if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}$/.test(trimmed)) {
      return trimmed;
    }
  }

  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return typeof dateInput === "string" ? dateInput : "Recent";
    }
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return typeof dateInput === "string" ? dateInput : "Recent";
  }
}

/**
 * Standardizes reading time into a uniform "X min read" format.
 */
export function formatReadingTime(readTimeInput: string | number | undefined | null): string {
  if (readTimeInput === undefined || readTimeInput === null || readTimeInput === "") {
    return "3 min read";
  }

  if (typeof readTimeInput === "number") {
    return `${Math.max(1, Math.round(readTimeInput))} min read`;
  }

  const match = String(readTimeInput).match(/\d+/);
  if (match) {
    return `${match[0]} min read`;
  }

  return "3 min read";
}
