ISRAR AFZAL - FINAL PORTFOLIO

COLOR SCHEME
Charcoal #171717 / Warm Ivory #F5F1E8 / Muted Gold #D6B36A.
The new palette covers desktop/mobile UI, controls, forms and video dialogs.
Photos, brand logos, video content and links retain their original appearance.

GITHUB / VERCEL - UPLOAD THESE FILES TOGETHER
The uploaded GitHub archive contained the HTML/CSS/JS but no assets folder.
This package restores all 86 assets: photos, company and brand logos, CV,
favicon and 66 locally stored video thumbnails.

1. Extract this ZIP on your computer first.
2. Open Israr_Portfolio_Fixed. Upload EVERYTHING INSIDE this folder to the
   GitHub repository, at the same level as the existing index.html.
   Keep the complete assets folder and its video-thumbnails subfolder.
   Do not upload just the ZIP, and do not select only the loose code files.
3. Replace the old index.html, CSS and script.js with these versions.
   Include vercel.json and verify-assets.mjs as well.
4. Before committing, check that the repository contains:
   index.html
   style.css, responsive.css, portfolio.css, script.js
   vercel.json, verify-assets.mjs
   assets/israr-afzal-portrait.jpeg
   assets/israr-afzal-about.jpeg
   assets/israr-afzal-cv.pdf
   assets/company-dikhade-logo.png (and all other supplied logos)
   assets/video-thumbnails/ (66 JPG files)
5. Commit to the branch connected to your Vercel project.
   Open the new deployment after it finishes. Refresh with Ctrl+F5 if needed.

Vercel Root Directory must be the folder containing index.html and vercel.json.
The included vercel.json selects Other, validates local assets before deploy,
and serves the current folder. No npm install or dependencies are required.
If an asset is omitted or its filename case changes, the build reports the
missing path instead of silently publishing a page with broken images.
Manual check (if Node.js is installed): node verify-assets.mjs

ROMAN URDU
ZIP extract kar ke Israr_Portfolio_Fixed ke ANDAR wali tamam files aur poora
assets folder GitHub mein index.html ke saath upload karein. Sirf HTML/CSS/JS
files upload karne se photos aur thumbnails phir missing ho jayengi.
assets/video-thumbnails ke andar 66 images bhi upload honi chahiye.

OTHER HOSTING / LOCAL VIEW
Open index.html, or upload all folder contents to public_html on your host.
The website remains plain HTML/CSS/JS. No build step is needed outside Vercel.

DEPLOYMENT REFERENCE
https://vercel.com/docs/project-configuration/vercel-json
https://vercel.com/docs/builds/configure-a-build

SELECTED WORK
66 unique Vimeo videos from israr.txt are included. One repeated link
(1243134945) was removed. Both review-page videos resolved to public videos.
Video titles, durations, original aspect ratios and embedding URLs were
checked against Vimeo metadata. Visual categories and descriptive project
titles were assigned by reviewing preview frames across every video.
The video-catalog.json and video-catalog.csv files list the final mapping.
Categories overlap intentionally: for example, a sportswear campaign can
appear in both Sports and Product & Fashion, without duplicating its card.

FEATURES
- Category, brand and text filters, plus Load More (12 videos at a time).
- One on-demand Vimeo player with original aspect ratio; Escape / Close exits.
- Direct Vimeo link for each video and a separate Behance graphic-design link.
- Local thumbnails; videos stream from Vimeo and require internet access.
- Video title and play control remain visible if a thumbnail cannot load.
- Without JavaScript, all 66 project links remain accessible on Vimeo.
- Updated Israr Afzal name, roles, tools, services, all supplied company/brand
  logo assets, both personal photos, contact links and original CV.
- WhatsApp inquiry form prepares a message; visitors review and send it there.
- No fake links, login-only Vimeo home link or unconfigured email-form service.

CONTACT
israrnatt987@gmail.com
Phone / WhatsApp: +92 304 3778769
LinkedIn: https://www.linkedin.com/in/israr-afzal-88471a228/
Behance: https://www.behance.net/srrtt

FILES
index.html: page content, project cards and links.
script.js: filters, player, navigation and WhatsApp message preparation.
style.css / responsive.css: supplied design and mobile styles.
portfolio.css: updated project grid and component styles.
assets/israr-afzal-cv.pdf: original CV, downloaded as Israr_Afzal_CV.pdf.
assets/video-thumbnails: locally stored Vimeo cover images.
video-catalog.json / video-catalog.csv: reference catalogs for future edits.
vercel.json: static hosting and automatic asset validation.
verify-assets.mjs: dependency-free check for missing or misnamed local assets.
Catalog files are reference copies; the live page reads its cards in index.html.

Vimeo privacy/embedding settings may affect playback if changed by the owner.
The page itself and local images can be viewed offline; external services
and Google Fonts require internet access (system fonts provide a fallback).
