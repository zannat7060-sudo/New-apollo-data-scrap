ApolloDataScrap - source for the static website
================================================
This folder generates the finished website (the "dist" folder).

Rebuild after editing content:
    node build.js          (writes ./dist)
    python3 make_assets.py (favicon, logo, social-share image)

Where to edit
  src/content.js  -> all page text, services, prices, FAQs, contact details (CONFIG at top)
  src/style.css   -> design
  src/main.js     -> menu, sample tabs, contact form
  build.js        -> domain (SITE), page titles + meta descriptions, structured data
