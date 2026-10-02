# Unique metadata for public pages

## Changes
- Add route-aware page titles, descriptions, canonical links, and Open Graph URLs for Home, About, Courses, Gallery, and Contact.
- Give the home page a descriptive title and retain matching static fallback metadata for social crawlers.
- Mark admin and missing-page views as not indexable.
- Verify the current build, then mark the selected SEO finding fixed for rescan.

## Technical details
- Use a small metadata component driven by the current React route.
- Keep canonical URLs self-referencing under `https://odeluniportedung.lovable.app`.
- Remove any static canonical that could conflict with route-specific canonical links.
