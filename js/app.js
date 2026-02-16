/* ============================================
   MAIN APPLICATION
   Handles: i18n, navigation, scroll animations,
   dynamic content, lazy loading
   ============================================ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────
  let currentLang = 'he';
  const isRtl = () => currentLang === 'he';

  // ── Initialize ─────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    applySettings();
    setLanguage(currentLang);
    buildNavigation();
    buildSocialIcons();
    buildDynamicContent();
    setupHeader();
    setupLanguageToggle();
    setupScrollAnimations();
    setupLazyLoading();
    setupSmoothScroll();
    setupActiveNav();
    hideFormFields();
  }

  // ── Apply Settings from Config ─────────────
  function applySettings() {
    const root = document.documentElement.style;

    // Colors
    const c = SETTINGS.colors;
    root.setProperty('--primary-blue', c.primaryBlue);
    root.setProperty('--royal-blue', c.royalBlue);
    root.setProperty('--bright-blue', c.brightBlue);
    root.setProperty('--light-blue', c.lightBlue);
    root.setProperty('--primary-red', c.primaryRed);
    root.setProperty('--deep-red', c.deepRed);
    root.setProperty('--light-red', c.lightRed);
    root.setProperty('--white', c.white);
    root.setProperty('--off-white', c.offWhite);
    root.setProperty('--dark-text', c.darkText);
    root.setProperty('--gray-text', c.grayText);
    root.setProperty('--light-gray', c.lightGray);
    root.setProperty('--overlay-dark', c.overlayDark);

    // Fonts
    const f = SETTINGS.fonts;
    root.setProperty('--font-primary', f.primary);
    root.setProperty('--font-secondary', f.secondary);
    root.setProperty('--font-english', f.english);

    // Font Sizes
    const fs = SETTINGS.fontSizes;
    root.setProperty('--fs-hero-headline', fs.heroHeadline + 'rem');
    root.setProperty('--fs-hero-subheadline', fs.heroSubheadline + 'rem');
    root.setProperty('--fs-section-title', fs.sectionTitle + 'rem');
    root.setProperty('--fs-section-subtitle', fs.sectionSubtitle + 'rem');
    root.setProperty('--fs-body', fs.bodyText + 'rem');
    root.setProperty('--fs-small', fs.smallText + 'rem');
    root.setProperty('--fs-button', fs.buttonText + 'rem');
    root.setProperty('--fs-nav', fs.navLink + 'rem');
    root.setProperty('--fs-achievement-num', fs.achievementNumber + 'rem');
    root.setProperty('--fs-achievement-label', fs.achievementLabel + 'rem');
    root.setProperty('--fs-footer', fs.footerText + 'rem');

    // Spacing & Layout
    const sp = SETTINGS.spacing;
    root.setProperty('--section-padding-y', sp.sectionPaddingY + 'rem');
    root.setProperty('--section-padding-x', sp.sectionPaddingX + 'rem');
    root.setProperty('--section-padding', sp.sectionPaddingY + 'rem ' + sp.sectionPaddingX + 'rem');
    root.setProperty('--content-max-width', sp.contentMaxWidth + 'px');
    root.setProperty('--header-height', sp.headerHeight + 'px');
    root.setProperty('--hero-min-height', sp.heroMinHeight + 'vh');
    root.setProperty('--hero-headline-gap', sp.heroHeadlineGap + 'rem');
    root.setProperty('--hero-subheadline-gap', sp.heroSubheadlineGap + 'rem');
    root.setProperty('--hero-column-gap', sp.heroColumnGap + 'rem');
    root.setProperty('--card-padding', sp.cardPadding + 'rem');
    root.setProperty('--form-gap', sp.formGap + 'rem');
    root.setProperty('--grid-gap', sp.gridGap + 'rem');

    // Image Sizes
    const sz = SETTINGS.images.sizes;
    root.setProperty('--hero-img-max-width', sz.heroMaxWidth || '500px');
    root.setProperty('--about-img-max-width', sz.aboutMaxWidth);
    root.setProperty('--partner-img-max-width', sz.partnerMaxWidth);

    // Logo
    const logoImg = document.getElementById('headerLogo');
    if (logoImg) {
      logoImg.src = SETTINGS.images.logo;
      logoImg.style.width = sz.logoWidth;
      logoImg.style.height = sz.logoHeight;
    }

    // Meta
    updateMeta();
  }

  function updateMeta() {
    const meta = SETTINGS.meta[currentLang];
    document.getElementById('pageTitle').textContent = meta.title;
    const desc = document.getElementById('metaDescription');
    if (desc) desc.setAttribute('content', meta.description);
  }

  // ── Language / i18n System ─────────────────
  function setLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');

      // Special case: language toggle shows the OTHER language label
      if (key === 'languageToggle') {
        el.textContent = CONTENT.languageToggle[lang];
        return;
      }

      // Resolve the value using the i18n path
      const value = resolveI18n(key, lang);
      if (typeof value === 'string') {
        if (el.tagName === 'INPUT') {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Rebuild dynamic content for new language
    buildDynamicContent();
    buildNavigation();
    updateMeta();

    // Update skip link
    const skipLink = document.getElementById('skipLink');
    if (skipLink) {
      skipLink.textContent = lang === 'he' ? 'דלג לתוכן' : 'Skip to content';
    }
  }

  /**
   * Resolve a data-i18n path like "hero.headline" to the actual string.
   * Content structure is: CONTENT.section[lang].key (e.g. CONTENT.hero.he.headline)
   * So for path "hero.headline" we try:
   *   1) CONTENT.hero.he.headline  (insert lang after first segment)
   *   2) CONTENT.hero.headline.he  (lang at end, for flat structures)
   *   3) CONTENT.hero.headline     (direct, if already a string)
   */
  function resolveI18n(path, lang) {
    const parts = path.split('.');

    // Strategy 1: Insert lang after the first segment
    // e.g. "hero.headline" → CONTENT.hero[lang].headline
    if (parts.length >= 2) {
      const section = parts[0];
      const rest = parts.slice(1);
      let obj = CONTENT[section];
      if (obj && obj[lang] !== undefined) {
        obj = obj[lang];
        for (const part of rest) {
          if (obj && obj[part] !== undefined) {
            obj = obj[part];
          } else {
            obj = undefined;
            break;
          }
        }
        if (typeof obj === 'string') return obj;
      }
    }

    // Strategy 2: Navigate the full path, then check for lang key at end
    let obj = CONTENT;
    for (const part of parts) {
      if (obj && obj[part] !== undefined) {
        obj = obj[part];
      } else {
        obj = undefined;
        break;
      }
    }
    if (obj && typeof obj === 'object' && obj[lang] !== undefined) {
      return obj[lang];
    }
    if (typeof obj === 'string') return obj;

    return undefined;
  }

  // ── Build Navigation ───────────────────────
  function buildNavigation() {
    const navItems = CONTENT.header[currentLang].navLinks;
    const navList = document.getElementById('navList');

    if (navList) {
      navList.innerHTML = navItems.map(item =>
        `<li><a href="${item.href}">${item.label}</a></li>`
      ).join('');
    }
  }

  // ── Build Social Icons ─────────────────────
  function buildSocialIcons() {
    const social = SETTINGS.social;
    const platforms = {
      facebook:  { icon: svgIcons.facebook, label: 'Facebook' },
      instagram: { icon: svgIcons.instagram, label: 'Instagram' },
      twitter:   { icon: svgIcons.twitter, label: 'X (Twitter)' },
      tiktok:    { icon: svgIcons.tiktok, label: 'TikTok' },
      whatsapp:  { icon: svgIcons.whatsapp, label: 'WhatsApp' },
      youtube:   { icon: svgIcons.youtube, label: 'YouTube' },
      telegram:  { icon: svgIcons.telegram, label: 'Telegram' },
    };

    // Small icon links (header + footer)
    const smallIconsHtml = Object.entries(social)
      .filter(([, url]) => url)
      .map(([key, url]) => {
        const p = platforms[key];
        return `<a href="${url}" target="_blank" rel="noopener noreferrer"
                   class="social-icon" aria-label="${p.label}">${p.icon}</a>`;
      }).join('');

    ['headerSocial', 'footerSocial'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = smallIconsHtml;
    });

    // Large social cards (follow section)
    const followSocial = document.getElementById('followSocial');
    if (followSocial) {
      followSocial.innerHTML = Object.entries(social)
        .filter(([, url]) => url)
        .map(([key, url]) => {
          const p = platforms[key];
          return `<a href="${url}" target="_blank" rel="noopener noreferrer"
                     class="social-card anim-fade-up">
                    <span class="social-card-icon ${key}">${p.icon}</span>
                    <span class="social-card-name">${p.label}</span>
                  </a>`;
        }).join('');
    }
  }

  // ── Build Dynamic Content ──────────────────
  function buildDynamicContent() {
    // Vision paragraphs
    const visionContent = document.getElementById('visionContent');
    if (visionContent) {
      const paragraphs = CONTENT.vision[currentLang].paragraphs;
      visionContent.innerHTML = paragraphs.map((p, i) =>
        `<p class="anim-fade-up anim-delay-${i + 1}">${p}</p>`
      ).join('');
    }

    // About bio
    const aboutBio = document.getElementById('aboutBio');
    if (aboutBio) {
      const bio = CONTENT.about[currentLang].bio;
      aboutBio.innerHTML = bio.map(p => `<p>${p}</p>`).join('');
    }

    // Achievement cards
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (achievementsGrid) {
      const achievements = CONTENT.about[currentLang].achievements;
      achievementsGrid.innerHTML = achievements.map((a, i) =>
        `<div class="achievement-card anim-fade-up anim-delay-${i + 1}">
           <div class="achievement-number counter-animate" data-target="${a.number}">${a.number}</div>
           <div class="achievement-label">${a.label}</div>
         </div>`
      ).join('');
    }

    // Re-observe new animated elements
    if (window._scrollObserver) {
      document.querySelectorAll('[class*="anim-"]').forEach(el => {
        if (!el.classList.contains('visible')) {
          window._scrollObserver.observe(el);
        }
      });
    }
  }

  // ── Header Scroll Behavior ─────────────────
  function setupHeader() {
    const header = document.getElementById('siteHeader');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ── Language Toggle ────────────────────────
  function setupLanguageToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const newLang = currentLang === 'he' ? 'en' : 'he';
      setLanguage(newLang);
    });
  }

  // ── Scroll Animations (Intersection Observer) ──
  function setupScrollAnimations() {
    if (!SETTINGS.animations.enabled) {
      // Show everything immediately
      document.querySelectorAll('[class*="anim-"]').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: SETTINGS.animations.threshold,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[class*="anim-"]').forEach(el => {
      observer.observe(el);
    });

    // Store observer for dynamic content
    window._scrollObserver = observer;
  }

  // ── Load Images from Config ─────────────────
  function setupLazyLoading() {
    // Hero image — load immediately (above the fold)
    const heroImg = document.getElementById('heroImage');
    if (heroImg) {
      heroImg.src = SETTINGS.images.heroDesktop;
    }

    // Below-fold images — lazy load
    const lazyImages = [
      { id: 'aboutImage', key: 'about' },
      { id: 'partnerImage', key: 'partner' },
    ];

    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazyload');
            img.classList.add('lazyloaded');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(({ id, key }) => {
      const img = document.getElementById(id);
      if (img) {
        img.setAttribute('data-src', SETTINGS.images[key]);
        imgObserver.observe(img);
      }
    });

    // Update alt text
    updateImageAlts();
  }

  function updateImageAlts() {
    const alts = SETTINGS.images.altText[currentLang];
    const mapping = {
      heroImage: 'hero',
      aboutImage: 'about',
      partnerImage: 'partner',
      headerLogo: 'logo'
    };

    Object.entries(mapping).forEach(([id, key]) => {
      const img = document.getElementById(id);
      if (img && alts[key]) {
        img.setAttribute('alt', alts[key]);
      }
    });
  }

  // ── Smooth Scroll ──────────────────────────
  function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height'));

      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    });
  }

  // ── Active Navigation Highlight ────────────
  function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = () => document.querySelectorAll('.nav-list a');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks().forEach(link => {
            link.classList.toggle('active',
              link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ── Hide Disabled Form Fields ──────────────
  function hideFormFields() {
    const fields = SETTINGS.form.fields;
    document.querySelectorAll('.form-field').forEach(field => {
      const name = field.getAttribute('data-field');
      if (name && fields[name] === false) {
        field.style.display = 'none';
        const input = field.querySelector('input');
        if (input) input.removeAttribute('required');
      }
    });
  }

  // ── SVG Icons ──────────────────────────────
  const svgIcons = {
    facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    tiktok: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>`,
    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    youtube: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    telegram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  };

})();
