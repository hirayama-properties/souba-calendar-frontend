// Hosted in-app (app/legal/*) rather than on Notion — Google's OAuth app
// verification rejected the Notion-hosted privacy policy because notion.site
// is a shared multi-tenant domain nobody can individually claim as an
// "authorized domain" (ownership must be verifiable, e.g. via Search
// Console, which only Notion itself could do for notion.site). Pages moved
// onto souba-calendar.com, which is already verified.
export const LEGAL_LINKS = {
  terms: '/legal/terms',
  privacy: '/legal/privacy',
  tokushoho: '/legal/tokushoho',
} as const;

export const CONTACT_EMAIL = 'hirayama.p.company@gmail.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
