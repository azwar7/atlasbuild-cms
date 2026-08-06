/**
 * AtlasBuild Enterprise Security Headers & CSP Configuration
 * Standardized according to OWASP Web Security Testing Guide (WSTG)
 */

export interface CSPConfigOptions {
  isDev?: boolean;
  reportOnly?: boolean;
  nonce?: string;
}

export function generateCSP(options: CSPConfigOptions = {}): string {
  const { isDev = false, nonce } = options;

  // Script Sources: In dev mode, allow 'unsafe-eval' for Webpack HMR/source-maps.
  // In production, 'unsafe-eval' is strictly omitted.
  const scriptSrcs = [
    "'self'",
    "'unsafe-inline'", // Required for Next.js App Router inline hydration scripts
    isDev ? "'unsafe-eval'" : "",
    nonce ? `'nonce-${nonce}'` : "",
  ].filter(Boolean);

  // Style Sources: Allows Google Fonts CSS and Next.js inline CSS
  const styleSrcs = [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
  ];

  // Font Sources: Local fonts & Google Fonts static binaries
  const fontSrcs = [
    "'self'",
    "data:",
    "https://fonts.gstatic.com",
  ];

  // Image Sources: Unsplash imagery, Cloudinary CDN, Google Maps static tiles, Data/Blob URIs
  const imgSrcs = [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://res.cloudinary.com",
    "https://maps.googleapis.com",
  ];

  // Connect Sources: API endpoints, Cloudinary upload endpoints, Google Maps, Neon DB
  const connectSrcs = [
    "'self'",
    "https://api.cloudinary.com",
    "https://maps.googleapis.com",
    "https://*.neon.tech",
    isDev ? "ws: wss:" : "", // WebSockets for dev HMR
  ].filter(Boolean);

  // Media Sources
  const mediaSrcs = [
    "'self'",
    "https://res.cloudinary.com",
  ];

  const cspDirectives = [
    `default-src 'self'`,
    `script-src ${scriptSrcs.join(' ')}`,
    `style-src ${styleSrcs.join(' ')}`,
    `font-src ${fontSrcs.join(' ')}`,
    `img-src ${imgSrcs.join(' ')}`,
    `connect-src ${connectSrcs.join(' ')}`,
    `media-src ${mediaSrcs.join(' ')}`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `manifest-src 'self'`,
    `worker-src 'self' blob:`,
    `report-to /api/csp-report`,
    `upgrade-insecure-requests`,
  ];

  return cspDirectives.join('; ').replace(/\s{2,}/g, ' ').trim();
}

/**
 * Returns security headers key-value map aligned with OWASP recommendations
 */
export function getSecurityHeaders(options: CSPConfigOptions = {}) {
  const { reportOnly = process.env.CSP_REPORT_ONLY === 'true' } = options;
  const cspHeaderName = reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
  const cspValue = generateCSP(options);

  return [
    {
      key: cspHeaderName,
      value: cspValue,
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(self), display-capture=()',
    },
    {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin',
    },
    {
      key: 'Cross-Origin-Resource-Policy',
      value: 'same-origin', // Hardened from 'cross-origin' to protect internal resources
    },
  ];
}
