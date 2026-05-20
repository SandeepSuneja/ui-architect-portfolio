/** Central SEO copy — keep in sync with `src/index.html` meta and JSON-LD. */
export const SITE_URL = 'https://sandytech.dev';

export const SITE_NAME = 'Sandeep Suneja — Portfolio';

export const SEO_TITLE =
  'Sandeep Suneja | Senior Angular Developer & Technical Lead | Delhi, India';

export const SEO_DESCRIPTION =
  'Senior Technical Lead and Angular architect with 10+ years building enterprise UI for fintech and global clients (LPL Financial, Citibank, Siemens). Expert in JavaScript, RxJS, AWS, and frontend leadership. Based in Delhi, India — open to senior roles and consulting.';

export const SEO_KEYWORDS = [
  'Sandeep Suneja',
  'Angular developer',
  'senior frontend developer',
  'technical lead',
  'UI architect',
  'enterprise Angular',
  'fintech frontend',
  'Angular architect India',
  'Delhi frontend developer',
  'JavaScript',
  'RxJS',
  'AWS',
  'frontend portfolio',
  'hire Angular developer',
].join(', ');

export const SEO_IMAGE = `${SITE_URL}/logo.png`;

export const SEO_AUTHOR = 'Sandeep Suneja';

export const SEO_LOCALE = 'en_IN';

export const SEO_SAME_AS = [
  'https://www.linkedin.com/in/sandeep-suneja-b04607a8/',
  'https://github.com/SandeepSuneja',
] as const;

export const SEO_KNOWS_ABOUT = [
  'Angular',
  'JavaScript',
  'TypeScript',
  'RxJS',
  'HTML5',
  'CSS',
  'AWS',
  'Frontend architecture',
  'Fintech UI',
  'Team leadership',
] as const;

/** Schema.org JSON-LD graph for index.html */
export const SEO_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SEO_DESCRIPTION,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SEO_AUTHOR,
      url: SITE_URL,
      image: SEO_IMAGE,
      jobTitle: 'Senior Technical Lead',
      description: SEO_DESCRIPTION,
      email: 'mailto:sandeepsuneja04@gmail.com',
      telephone: '+91-82853-61389',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Incedo Inc.',
      },
      sameAs: [...SEO_SAME_AS],
      knowsAbout: [...SEO_KNOWS_ABOUT],
    },
  ],
} as const;
