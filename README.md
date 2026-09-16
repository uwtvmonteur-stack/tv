# Uw TV Monteur — website

Professionele multi-page website voor Uw TV Monteur, gebouwd met **Next.js 16**, **Tailwind CSS v4** en AI-gegenereerde fotografie (hero in 4K). Volledig statisch gegenereerd (52 pagina's) en geoptimaliseerd voor SEO en lokale vindbaarheid.

## Lokaal draaien

```bash
npm install
npm run dev        # ontwikkelserver op http://localhost:3000
npm run build      # productie-build (genereert alle 52 pagina's statisch)
npm run start      # productie-server
```

## Deployen op Vercel

**Optie 1 — via de Vercel CLI (snelst):**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Optie 2 — via GitHub:** push deze map naar een repository en importeer die op [vercel.com/new](https://vercel.com/new). Vercel herkent Next.js automatisch.

## Pagina's & SEO

| Route | Doel-zoekwoord |
| --- | --- |
| `/` | tv monteur aan huis |
| `/tv-ophangen` | tv ophangen |
| `/diensten/tv-installatie` | tv installatie, tv installateur, tv installatie service |
| `/diensten/tv-instellen` | tv hulp aan huis, hulp bij installeren tv |
| `/diensten/soundbar-installatie` | soundbar installeren |
| `/werkgebied/[provincie]` | tv monteur zuid-holland / noord-holland / utrecht / noord-brabant |
| `/tv-monteur/[stad]` | tv monteur rotterdam, amsterdam, utrecht … (32 steden) |

SEO-voorzieningen: `sitemap.xml` en `robots.txt` (gegenereerd), unieke titles/descriptions/canonicals per pagina, Open Graph + `og.jpg`, JSON-LD (`LocalBusiness`, `WebSite`, `Service` met `GeoCoordinates` en `Offer`s, `BreadcrumbList`, `FAQPage`), geo-metatags per stad (`geo.region`, `geo.position`, `ICBM`), interne linking via hubs/footer/nabijgelegen steden, en `public/llms.txt` voor AI-zoekmachines.

## Vóór livegang aanpassen

| Wat | Waar |
| --- | --- |
| **Telefoon, e-mail, WhatsApp, domein** | `lib/site.ts` (centraal — vrijwel overal doorgevoerd) |
| Prijzen, reviews, statistieken, FAQ | `lib/content.ts` |
| Steden/werkgebied uitbreiden | `lib/steden.ts` (naam, slug, provincie, coördinaten, unieke tekst, buursteden) |
| KvK-nummer | `components/Footer.tsx` |
| Telefoonnummer in lopende teksten | `app/page.tsx` (FAQ-sectie), `lib/content.ts`, provincie-/stadspagina-FAQ's |
| `llms.txt` en JSON-LD-domein | `public/llms.txt` volgt `lib/site.ts` niet automatisch — pas het domein daar ook aan |

Let op: statistieken (12.000+, 4,9/5, 850+ reviews) en de drie klantreviews zijn **placeholders**. Vervang ze door echte cijfers en echte reviews vóór livegang — verzonnen beoordelingen kunnen een Google-penalty opleveren.

## Formulier en conversiemeting (verplicht vóór livegang)

Kopieer `.env.example` naar `.env.local` (lokaal) of zet de variabelen als Environment Variables op Vercel:

| Variabele | Doel |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | **Verplicht.** SMTP-account waarmee `app/api/afspraak/route.ts` aanvragen verstuurt (nodemailer). Zonder deze gegevens opent het formulier alleen een e-mailconcept en komen aanvragen niet vanzelf binnen. |
| `SMTP_SECURE` | `true` bij poort 465; leeg laten bij 587 (STARTTLS). |
| `MAIL_TO` / `MAIL_FROM` | Ontvanger van aanvragen (standaard `SITE.email`) en afzenderadres (standaard `SMTP_USER`). |
| `NEXT_PUBLIC_GA_ID` | GA4-meet-ID (`G-…`). Meet automatisch `telefoon_klik`, `whatsapp_klik` en `afspraak_aanvraag`. |
| `NEXT_PUBLIC_ADS_CONVERSION_FORM` | Google Ads-conversielabel (`AW-…/…`) voor een formulieraanvraag. |
| `NEXT_PUBLIC_ADS_CONVERSION_CALL` | Google Ads-conversielabel voor een klik op het telefoonnummer. |

Zonder ID's wordt er géén trackingscript geladen. De reactiebelofte, reviewscore en review-link staan centraal in `lib/site.ts` (`SITE.reactie`, `SITE.reviews`).

Na livegang: verifieer het domein in [Google Search Console](https://search.google.com/search-console), dien `sitemap.xml` in en maak een [Google Bedrijfsprofiel](https://business.google.com) aan — essentieel voor lokale vindbaarheid.

## Structuur

```
app/
  layout.tsx              # fonts, metadata-template, LocalBusiness/WebSite JSON-LD, Nav + Footer
  page.tsx                # homepage (tv monteur aan huis)
  diensten/               # hub + 5 dienstpagina's
  prijzen/  contact/  over-ons/
  werkgebied/             # hub + [provincie] (4 provinciepagina's)
  tv-monteur/[stad]/      # 32 stadspagina's (generateStaticParams)
  sitemap.ts  robots.ts  not-found.tsx  icon.svg
components/               # Nav, Footer, PageHeader, Breadcrumbs, CtaSection, Faq, ContactForm, Reveal, JsonLd, ui, icons
lib/
  site.ts                 # bedrijfsgegevens (centraal)
  steden.ts               # provincies + 32 steden met geo-data
  content.ts              # diensten, prijzen, reviews, FAQ, statistieken
  seo.ts                  # pageMeta-, Service-, FAQ-JSON-LD-helpers
public/
  images/                 # AI-fotografie (hero 4096×2294)
  og.jpg  llms.txt
```
