// Facts about the studio used across the site. Change them here, nowhere else.
export const site = {
  name: 'Oddly Official Games',
  domain: 'oddlyofficialgames.com',
  email: 'contact@oddlyofficialgames.com',
  /** The person who publishes the site and the games. Same wording as the Conepocalypse privacy policy. */
  publisher: 'Nicolas Rello',
  /** Website host, named in the legal notice. Update if the hosting changes. */
  host: {
    name: 'GitHub Pages',
    company: 'GitHub, Inc.',
    address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA',
    privacyUrl: 'https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement',
  },
  /** Date of the last change to the legal notice (ISO). */
  legalUpdated: '2026-11-10',
  copyrightYear: 2026,
} as const;
