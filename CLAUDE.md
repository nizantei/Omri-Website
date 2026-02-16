# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Political candidate campaign website. Static site built with plain HTML, CSS, and JavaScript — no framework or build tools.

## Architecture

- **Config-driven**: All text, colors, images, and settings are in `config/content.js` and `config/settings.js`. The HTML/JS reads from these at runtime.
- **Bilingual (Hebrew/English)**: Content objects have `he` and `en` keys. `js/app.js` handles language switching and RTL/LTR direction.
- **Data attribute binding**: Elements use `data-i18n="section.key"` attributes, populated from `CONTENT` config by `app.js`.
- Single `index.html` entry point — all sections are on one page with anchor navigation.

### Key Files

- `config/content.js` — `CONTENT` global: all text in both languages
- `config/settings.js` — `SETTINGS` global: colors, fonts, images, social links, form endpoint, animation settings
- `js/app.js` — Main logic: i18n system, navigation, scroll animations, lazy loading, dynamic content rendering
- `js/accessibility.js` — Accessibility widget: font size, contrast, grayscale, reading mask, persisted to localStorage
- `js/form.js` — Lead capture form validation and submission (ready for Google Apps Script endpoint)
- `css/styles.css` — All styles including responsive breakpoints (1024px, 768px, 480px)
- `css/animations.css` — Scroll-triggered animations using Intersection Observer, respects `prefers-reduced-motion`

### Form / Lead Capture

Forms submit to the URL in `SETTINGS.form.submissionEndpoint`. When empty, data is stored in localStorage under `pending-leads`. The endpoint is designed for Google Apps Script Web App (no-cors POST with JSON body). Form data fields: `firstName`, `lastName`, `email`, `phone`, `timestamp`, `source`, `language`.

## Development

No build or install commands. Open `index.html` directly or use a local server:

```
python -m http.server 8000
npx serve .
```

## Conventions

- Hebrew is the default language (RTL). English switches to LTR.
- CSS custom properties in `:root` are overwritten at runtime from `SETTINGS.colors` by `app.js`.
- Animation classes: `anim-fade-up`, `anim-fade-right`, etc. — triggered by Intersection Observer, add `visible` class.
- All images go in `images/` folder, referenced from `SETTINGS.images`.
