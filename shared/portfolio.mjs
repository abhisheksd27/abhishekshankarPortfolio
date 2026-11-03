import reviewedPortfolio from './portfolio.json' with { type: 'json' };

// Existing stored content predates this review. A later admin save replaces only
// the section it edits; other sections keep the reviewed baseline.
export const CONTENT_REVIEWED_AT = '2026-11-01T00:00:00.000Z';
export const DEFAULT_PORTFOLIO_DATA = reviewedPortfolio;

export function mergePortfolioData(remote) {
  if (!remote || typeof remote !== 'object' || Array.isArray(remote)) return reviewedPortfolio;
  const merged = { ...remote, ...reviewedPortfolio };
  for (const section of Object.keys(reviewedPortfolio)) {
    const editedAt = Date.parse(remote.sectionUpdatedAt?.[section]);
    if (editedAt >= Date.parse(CONTENT_REVIEWED_AT) && remote[section] != null) {
      const fallback = reviewedPortfolio[section];
      if (Array.isArray(fallback)) {
        if (Array.isArray(remote[section])) merged[section] = remote[section];
      } else if (typeof remote[section] === 'object' && !Array.isArray(remote[section])) {
        merged[section] = { ...fallback, ...remote[section] };
      }
    }
  }
  return merged;
}
