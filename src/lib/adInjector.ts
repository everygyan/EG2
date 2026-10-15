/**
 * Utility to inject non-intrusive in-article advertising slots
 * into long-form article content after a designated paragraph threshold.
 */
export function injectInArticleAds(htmlContent: string): string {
  if (!htmlContent) return "";

  const paragraphClosingTag = "</p>";
  const parts = htmlContent.split(paragraphClosingTag);

  // If article has 3 or more paragraphs, inject an ad after paragraph 2
  if (parts.length >= 3) {
    const adHtml = `
      <div class="my-8 p-4 bg-[#FAFAFC] border border-[#E5E5EB] rounded-lg shadow-2xs">
        <div class="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#999999] mb-2 font-medium">
          <span>Sponsored Recommendation</span>
          <span className="font-mono text-[9px]">EveryGyan Partner</span>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <h4 class="text-sm font-bold text-gray-900 leading-snug">
              EveryGyan Cloud & AI Accelerator: Master Modern Scalable Systems
            </h4>
            <p class="text-xs text-gray-600">
              Hands-on enterprise architecture training from senior DeepMind & cloud engineers.
            </p>
          </div>
          <a
            href="/learning"
            class="whitespace-nowrap px-4 py-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-bold rounded transition shrink-0"
          >
            Explore Masterclass →
          </a>
        </div>
      </div>
    `;

    // Reconstruct with ad injected after second paragraph
    const firstTwo = parts.slice(0, 2).join(paragraphClosingTag) + paragraphClosingTag;
    const remaining = parts.slice(2).join(paragraphClosingTag);

    return `${firstTwo}${adHtml}${remaining}`;
  }

  return htmlContent;
}
