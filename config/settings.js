/*
 * ============================================
 *  SITE SETTINGS CONFIGURATION
 * ============================================
 *  Edit values below to change colors, fonts,
 *  images, sizes, social links, and more.
 * ============================================
 */

const SETTINGS = {

  // ── Color Palette ────────────────────────
  //    Change these to rebrand the entire site
  colors: {
    primaryBlue: "#1B2A4A",   // Dark navy — header, footer
    royalBlue: "#2C5F8A",   // Main blue — buttons, accents
    brightBlue: "#3D7EC7",   // Lighter blue — hover states
    lightBlue: "#E8F0FE",   // Pale blue — section backgrounds
    primaryRed: "#C8102E",   // Bold red — highlights, CTA
    deepRed: "#9B1B30",   // Dark red — hover states
    lightRed: "#FDE8EC",   // Pale red — subtle backgrounds
    white: "#FFFFFF",
    offWhite: "#F8F9FA",
    darkText: "#1A1A2E",   // Main body text
    grayText: "#555555",   // Secondary text
    lightGray: "#E0E0E0",   // Borders, dividers
    overlayDark: "rgba(26, 42, 74, 0.7)", // Hero overlay
  },

  // ── Typography ───────────────────────────
  fonts: {
    // Google Fonts loaded in index.html
    primary: "'Heebo', 'Segoe UI', sans-serif",  // Hebrew-friendly
    secondary: "'Frank Ruhl Libre', serif",          // Headings
    english: "'Inter', 'Segoe UI', sans-serif",    // English text
    readable: "'Arial', sans-serif",                 // Accessibility fallback
  },

  // ── Font Sizes (in rem) ──────────────────
  fontSizes: {
    heroHeadline: "7",
    heroSubheadline: "3",
    sectionTitle: "2.5",
    sectionSubtitle: "1.25",
    bodyText: "1.1",
    smallText: "0.9",
    buttonText: "1.1",
    navLink: "1",
    achievementNumber: "3",
    achievementLabel: "1",
    footerText: "0.9",
  },

  // ── Spacing (in rem) ────────────────────
  spacing: {
    sectionPaddingY: "6",     // Top/bottom padding for sections
    sectionPaddingX: "2",     // Left/right padding for sections
    contentMaxWidth: "1200",  // Max width of content in px
    headerHeight: "80",    // Header height in px
    heroMinHeight: "90",    // Hero section min-height in vh
    heroHeadlineGap: "1",   // Space below the headline (rem)
    heroSubheadlineGap: "-2", // Space below the subheadline (rem)
    heroColumnGap: "2",     // Space between text and image columns (rem)
    cardPadding: "2",
    formGap: "1",
    gridGap: "2",
  },

  // ── Images ───────────────────────────────
  //    Replace paths with your actual images
  images: {
    logo: "images/Logo.png",
    heroDesktop: "images/Omri_Hero.jpeg",
    heroMobile: "images/Omri_Hero.jpeg",
    about: "images/Nitsan_Event.png",
    partner: "images/Nitsan With Leader.png",
    favicon: "images/favicon.ico",
    ogImage: "images/og-image.jpg",

    // Alt text for accessibility
    altText: {
      he: {
        logo: "לוגו התנועה",
        hero: "תמונת המועמד",
        about: "תמונת פרופיל",
        partner: "המועמד עם מנהיג התנועה"
      },
      en: {
        logo: "Movement Logo",
        hero: "Candidate Photo",
        about: "Profile Photo",
        partner: "Candidate with Movement Leader"
      }
    },

    // Image dimensions (CSS values)
    sizes: {
      logoWidth: "120px",
      logoHeight: "120px",
      heroMaxWidth: "800px",    // Hero candidate image max width
      aboutMaxWidth: "800px",
      partnerMaxWidth: "800px",
    }
  },

  // ── Social Media Links ───────────────────
  //    Set to "" (empty string) to hide a link
  social: {
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-profile",
    twitter: "https://x.com/your-handle",
    tiktok: "https://tiktok.com/@your-handle",
    whatsapp: "https://chat.whatsapp.com/your-group-link",
    youtube: "",
    telegram: "",
  },

  // ── Form / Lead Capture ──────────────────
  form: {
    // Google Apps Script Web App URL (set after deploying script)
    // See DOCUMENTATION.md for setup instructions
    submissionEndpoint: "",

    // Fields to collect (true = show, false = hide)
    fields: {
      name: true,
      email: true,
      phone: true,
    },

    // Require privacy consent checkbox
    requirePrivacy: true,
    privacyPolicyUrl: "#privacy",
  },

  // ── Animations ───────────────────────────
  animations: {
    enabled: true,
    duration: "0.8s",
    delay: "0.15s",     // Stagger delay between items
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    threshold: 0.15,        // How much of element must be visible (0-1)
    heroTypingSpeed: 80,          // ms per character for hero text
  },

  // ── SEO / Meta ───────────────────────────
  meta: {
    he: {
      title: "שם המועמד — תנועה פוליטית",
      description: "הצטרפו למועמד לקידום חזון מדיני ותיקון חברתי",
    },
    en: {
      title: "Candidate Name — Political Movement",
      description: "Join the candidate for political vision and social change",
    }
  },

  // ── Accessibility Widget ─────────────────
  accessibilityWidget: {
    position: "bottom-left",  // "bottom-left" or "bottom-right"
    iconColor: "#2C5F8A",
    iconSize: "56px",
    panelWidth: "320px",
  }
};
