/* Static site generator for ApolloDataScrap.
   Run:  node build.js      ->  writes the finished site into ./dist           */
const fs = require('fs');
const path = require('path');
const C = require('./src/content.js');
const { CONFIG, SERVICES, HOME_FAQ, bySlug } = C;

/* ===== change these two lines if your domain / date differ ===== */
const SITE = 'https://apollodatascrap.com';   // no trailing slash
const LASTMOD = '2026-10-12';
/* =============================================================== */

const OUT = path.join(__dirname, 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
const write = (rel, data) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, data);
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const abs = p => SITE + p;

/* ---------- SEO text for every page (title <= ~60 chars, description <= ~160) ---------- */
const SEO = {
  home: {
    path: '/', nav: 'home',
    title: 'Apollo Data Scraping & Lead Enrichment | ApolloDataScrap',
    desc: 'Apollo and LinkedIn Sales Navigator lead data with verified emails, mobile numbers and company data, delivered as a clean Google Sheet or CSV.'
  },
  services: {
    path: '/services/', nav: 'services',
    title: 'Apollo & Sales Navigator Data Services | ApolloDataScrap',
    desc: 'Six lead data services: Apollo scraping, mobile numbers, company data, email enrichment, Sales Navigator and Clay. Clear starting prices, fast delivery.'
  },
  about: {
    path: '/about/', nav: 'about',
    title: 'About ApolloDataScrap: Lead Data for Sales Teams',
    desc: 'ApolloDataScrap is a lead data service for sales teams, agencies and founders. We collect, enrich and clean contacts into ready-to-use sheets.'
  },
  contact: {
    path: '/contact/', nav: 'contact',
    title: 'Contact & Request a Sample | ApolloDataScrap',
    desc: 'Tell us your target audience and the data you need. We reply with scope, price and a matching sample, usually within one business day.'
  }
};
const SVC_SEO = {
  'apollo-data-scraping': ['Apollo Data Scraping Service | ApolloDataScrap',
    'Apollo lead scraping with names, job titles, companies and checked business emails in a clean Google Sheet. From $3 per 1,000 leads.'],
  'apollo-mobile-number-scraping': ['Apollo Mobile Number Scraping | ApolloDataScrap',
    'Get direct mobile numbers for your Apollo contacts, each with country code and status. Delivered as a Google Sheet or CSV from $5 per 100 contacts.'],
  'apollo-company-data-scraping': ['Apollo Company Data Scraping | ApolloDataScrap',
    'Company lists from Apollo with industry, size, revenue, website and location, ready for outreach. From $2 per 1,000 companies, delivered in 1 to 2 days.'],
  'apollo-email-enrichment': ['Apollo Email Enrichment & Verification | ApolloDataScrap',
    'Find and verify business emails from names and company domains. Every email gets a valid, risky or invalid status. From $3 per 1,000 contacts.'],
  'linkedin-sales-navigator-scraping': ['LinkedIn Sales Navigator Scraping | ApolloDataScrap',
    'Export leads from your Sales Navigator search with name, headline, company, seniority and profile link. From $3 per 1,000 leads in 1 to 3 days.'],
  'clay-mobile-number-enrichment': ['Clay Mobile Number Enrichment | ApolloDataScrap',
    'Find mobile numbers across several data providers with a Clay workflow, with source and status recorded for each. From $45 per 1,000 contacts.']
};
SERVICES.forEach(s => {
  const [title, desc] = SVC_SEO[s.slug];
  SEO['svc:' + s.slug] = { path: `/services/${s.slug}/`, nav: 'services', title, desc };
});

/* ---------- structured data ---------- */
const orgId = abs('/#organization');
const org = {
  '@type': 'Organization', '@id': orgId, name: CONFIG.brand, url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/assets/img/logo-512.png'), width: 512, height: 512 },
  email: CONFIG.email,
  description: 'Lead data service for Apollo, LinkedIn Sales Navigator and Clay: contacts, company data, email and mobile number enrichment delivered as a Google Sheet or CSV.'
};
const website = { '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: CONFIG.brand, inLanguage: 'en', publisher: { '@id': orgId } };
const crumbs = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) }))
});
const faqLd = faq => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } }))
});

function structured(key) {
  const home = ['Home', '/'];
  if (key === 'home') return [{ '@context': 'https://schema.org', '@graph': [org, website] }, faqLd(HOME_FAQ)];
  if (key === 'services') return [
    crumbs([home, ['Services', '/services/']]),
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'ApolloDataScrap services',
      itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: abs(`/services/${s.slug}/`) })) }
  ];
  if (key === 'about') return [crumbs([home, ['About', '/about/']])];
  if (key === 'contact') return [crumbs([home, ['Contact', '/contact/']])];
  if (key.startsWith('svc:')) {
    const s = bySlug(key.slice(4));
    const url = abs(`/services/${s.slug}/`);
    return [
      crumbs([home, ['Services', '/services/'], [s.title, `/services/${s.slug}/`]]),
      { '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#service', name: s.title, url,
        serviceType: s.title, description: SEO[key].desc, provider: { '@id': orgId }, areaServed: 'Worldwide',
        offers: { '@type': 'Offer', price: String(s.price), priceCurrency: 'USD', url,
          description: `Starting price per ${s.unit}. Turnaround: ${s.turnaround}.` } },
      faqLd(s.faq)
    ];
  }
  return [];
}

/* ---------- page shell ---------- */
const FONT = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600;700&display=swap';
const nav = key => [['home', '/', 'Home'], ['services', '/services/', 'Services'], ['about', '/about/', 'About'], ['contact', '/contact/', 'Contact']]
  .map(([k, href, label]) => `<a href="${href}" data-nav="${k}"${k === key ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');

function shell(key, bodyHtml) {
  const m = SEO[key];
  const url = abs(m.path);
  const ogImg = abs('/assets/img/og-image.png');
  return `<!DOCTYPE html>
<html lang="en" data-email="${esc(CONFIG.email)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2750F0">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(CONFIG.brand)}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(CONFIG.brand)}: Apollo and LinkedIn lead data delivered in a clean Google Sheet">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(m.title)}">
<meta name="twitter:description" content="${esc(m.desc)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONT}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${FONT}"></noscript>
<link rel="stylesheet" href="/assets/css/style.css">
${structured(key).map(ld).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="site-header" id="siteHeader">
  <div class="wrap site-header__in">
    <a class="brand" href="/" aria-label="${esc(CONFIG.brand)} home"><span id="brandMark">${C.logoSvg()}</span><span class="brand__name">${esc(CONFIG.brand)}</span></a>
    <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Main">
      ${nav(m.nav)}
      <a class="btn btn--primary nav__cta" href="/contact/">Request a sample</a>
    </nav>
  </div>
</header>

<main id="main" tabindex="-1">${bodyHtml}
</main>
<footer class="site-footer" id="footer">${C.footerHtml()}
</footer>

<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

/* ---------- write pages ---------- */
write('index.html', shell('home', C.pageHome()));
write('services/index.html', shell('services', C.pageServices()));
write('about/index.html', shell('about', C.pageAbout()));
write('contact/index.html', shell('contact', C.pageContact(new URLSearchParams(''))));
SERVICES.forEach(s => write(`services/${s.slug}/index.html`, shell('svc:' + s.slug, C.pageService(s.slug))));

/* 404 (not indexed) */
write('404.html', shell('home', `
  <section class="page-head"><div class="wrap">
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist or has moved.</p>
    <p style="margin-top:22px"><a class="btn btn--primary" href="/">Go to the home page</a> <a class="btn btn--ghost" href="/services/">See our services</a></p>
  </div></section>`)
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | ' + esc(CONFIG.brand) + '</title>')
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex,follow">')
  .replace(/<link rel="canonical"[^>]*>\n/, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, ''));

/* ---------- static assets ---------- */
fs.mkdirSync(path.join(OUT, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets/js'), { recursive: true });
fs.copyFileSync('src/style.css', path.join(OUT, 'assets/css/style.css'));
fs.copyFileSync('src/main.js', path.join(OUT, 'assets/js/main.js'));

/* ---------- robots + sitemap ---------- */
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const urls = Object.keys(SEO).map(k => SEO[k].path);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${abs(u)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`);

/* ---------- Apache (cPanel) settings: speed, 404, no folder listing ---------- */
write('.htaccess', `# ApolloDataScrap: server settings (Apache / cPanel hosting)
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

# Force HTTPS: remove the leading # on the 3 lines below AFTER your SSL certificate is active
#RewriteEngine On
#RewriteCond %{HTTPS} off
#RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=301]

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml text/plain application/ld+json
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`);

/* ---------- report ---------- */
Object.entries(SEO).forEach(([k, m]) => console.log(`${String(m.title.length).padStart(3)}t ${String(m.desc.length).padStart(3)}d  ${m.path}`));
console.log('built', urls.length, 'pages + 404 ->', OUT);
