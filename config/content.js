/*
 * ============================================
 *  CONTENT CONFIGURATION
 * ============================================
 *  Edit the text values below to change all
 *  website content. Each section has Hebrew (he)
 *  and English (en) versions.
 * ============================================
 */

const CONTENT = {

  // ── Header / Navigation ──────────────────
  header: {
    he: {
      partyName: "המפתחים",
      candidateName: "ניצן טייכהולץ",
      ctaButton: "הצטרפו אליי",
      navLinks: [
        { label: "ראשי", href: "#hero" },
        { label: "חזון", href: "#vision" },
        { label: "אודות", href: "#about" },
        { label: "צרו קשר", href: "#join" }
      ]
    },
    en: {
      partyName: "The Developers",
      candidateName: "Nitsan Teichholtz",
      ctaButton: "Join Me",
      navLinks: [
        { label: "Home", href: "#hero" },
        { label: "Vision", href: "#vision" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#join" }
      ]
    }
  },

  // ── Hero Section ─────────────────────────
  hero: {
    he: {
      headline: "ניצן טייכהולץ",
      subheadline: "שינוי חברתי דרך פיתוח תוכנה"
    },
    en: {
      headline: "Nitsan Teichholtz",
      subheadline: "Social change through software development"
    }
  },

  // ── Vision / Mission Section ─────────────
  vision: {
    he: {
      title: "למה אני מתמודד",
      paragraphs: [
        "שמעו זה נראה כיף. עולם הפוליטיקה מלא באקשן ודרמות ולפעמים זה קצת חסר לי.",
        "אני בסך הכל בחור הגון וכנה, ואני מאמין שזה משהו שאין לרוב הפוליטיקאים שרואים בטלוויזיה. אבל אולי רק אלה שרוקחים מזימות מגיעים לטלוויזיה. לא יודע...",
        "בכל מקרה אני מבין בטכנלוגיה וכאלה שזה דיי מגניב ונראה לי שזה יכול לעזור!"
      ]
    },
    en: {
      title: "Why I'm Running",
      paragraphs: [
        "Listen, it looks fun. The world of politics is full of action and drama, and sometimes I kind of miss that.",
        "I'm basically an honest and straightforward guy, and I believe that's something most politicians you see on TV don't have. But maybe only those who plot conspiracies make it to television. I don't know...",
        "Anyway, I understand technology and stuff, which is pretty cool and I think it could help!"
      ]
    }
  },

  // ── Join Form (appears twice on page) ────
  joinForm: {
    he: {
      title: "הצטרפו אליי",
      subtitle: "השאירו פרטים ונהיה בקשר",
      fields: {
        name: "שם",
        email: "אמייל",
        phone: "מספר טלפון"
      },
      howCanIHelp: "איך אני יכול לעזור?",
      checkboxes: {
        hostMeetings: "אני יכול לארח חוגי בית",
        volunteer: "אני רוצה להתנדב",
        joinUpdates: "אני רוצה להצטרף לקבוצת העדכונים"
      },
      privacyText: "אני מסכים/ה לקבל עדכונים בהתאם ל",
      privacyLink: "מדיניות הפרטיות",
      submitButton: "הצטרפו",
      successMessage: "תודה! פרטיכם נשמרו בהצלחה.",
      errorMessage: "אירעה שגיאה. אנא נסו שוב."
    },
    en: {
      title: "Join Me",
      subtitle: "Leave your details and we'll stay in touch",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone Number"
      },
      howCanIHelp: "How can I help?",
      checkboxes: {
        hostMeetings: "I can host house meetings",
        volunteer: "I want to volunteer",
        joinUpdates: "I want to join the updates group"
      },
      privacyText: "I agree to receive updates per the",
      privacyLink: "Privacy Policy",
      submitButton: "Join",
      successMessage: "Thank you! Your details were saved successfully.",
      errorMessage: "An error occurred. Please try again."
    }
  },

  // ── About Section ────────────────────────
  about: {
    he: {
      title: "קצת עליי",
      tagline: "מנהיג בשדה, משרת את הציבור",
      bio: [
        "בעל ניסיון בצוותי פיתוח שונים במוצרים טכנולוגים בשווקים בינלאומיים",
        "לאורך חיי פעלתי במגוון מגזרים ובגזרי נייר",
        "מתגורר ביפן בטוקיו ומגניב פה רצח."
      ],
      achievements: [
        { number: "20+", label: "שנות ניסיון" },
        { number: "1000+", label: "אנשים שהובלתי" },
        { number: "50+", label: "פרויקטים" }
      ]
    },
    en: {
      title: "About Me",
      tagline: "A leader in the field, serving the public",
      bio: [
        "with an expirience of software development in different technology products in international markets",
        "I have worked in different sectors and scissors.",
        "I live in Tokyo, Japan and I'm having a great time here."
      ],
      achievements: [
        { number: "20+", label: "Years of Experience" },
        { number: "1000+", label: "People Led" },
        { number: "50+", label: "Projects" }
      ]
    }
  },

  // ── Partner / Alliance Section ───────────
  partner: {
    he: {
      caption: "יחד עם מנהיג התנועה, פועלים למען עתיד טוב יותר לישראל"
    },
    en: {
      caption: "Together with the movement leader, working for a better future for Israel"
    }
  },

  // ── Follow / Social Section ──────────────
  follow: {
    he: {
      title: "עקבו אחריי",
      subtitle: "הישארו מעודכנים בכל הערוצים"
    },
    en: {
      title: "Follow Me",
      subtitle: "Stay updated on all channels"
    }
  },

  // ── Footer ───────────────────────────────
  footer: {
    he: {
      copyright: "© כל הזכויות שמורות",
      designCredit: "עיצוב: שם המעצב",
      photoCredit: "צילום: שם הצלם"
    },
    en: {
      copyright: "© All Rights Reserved",
      designCredit: "Design: Designer Name",
      photoCredit: "Photography: Photographer Name"
    }
  },

  // ── Accessibility Widget ─────────────────
  accessibility: {
    he: {
      title: "נגישות",
      options: {
        increaseFontSize: "הגדלת טקסט",
        decreaseFontSize: "הקטנת טקסט",
        increaseLineHeight: "הגדלת מרווח שורות",
        readableFont: "גופן קריא",
        highContrast: "ניגודיות גבוהה",
        grayscale: "גווני אפור",
        highlightLinks: "הדגשת קישורים",
        readingMask: "מסכת קריאה",
        hideImages: "הסתרת תמונות",
        pauseAnimations: "עצירת אנימציות",
        focusOutline: "מסגרת פוקוס",
        resetAll: "איפוס הכל"
      }
    },
    en: {
      title: "Accessibility",
      options: {
        increaseFontSize: "Increase Text",
        decreaseFontSize: "Decrease Text",
        increaseLineHeight: "Line Height",
        readableFont: "Readable Font",
        highContrast: "High Contrast",
        grayscale: "Grayscale",
        highlightLinks: "Highlight Links",
        readingMask: "Reading Mask",
        hideImages: "Hide Images",
        pauseAnimations: "Pause Animations",
        focusOutline: "Focus Outline",
        resetAll: "Reset All"
      }
    }
  },

  // ── Language Toggle ──────────────────────
  languageToggle: {
    he: "EN",
    en: "עב"
  }
};
