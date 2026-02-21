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
      partyName: "הדמוקרטים",
      candidateName: "עמרי רונן",
      ctaButton: "הצטרפו אליי",
      navLinks: [
        { label: "ראשי", href: "#hero" },
        { label: "חזון", href: "#vision" },
        { label: "אודות", href: "#about" },
        { label: "צרו קשר", href: "#join" }
      ]
    },
    en: {
      partyName: "The Democrats",
      candidateName: "Omri Ronen",
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
      headline: "עמרי רונן",
      subheadline: "בונים מחדש"
    },
    en: {
      headline: "Omri Ronen",
      subheadline: "Building Anew"
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
        name: "שם מלא",
        email: "אמייל",
        phone: "מספר טלפון",
        city: "מקום מגורים"
      },
      howCanIHelp: "איך אני יכול לעזור?",
      checkboxes: {
        hostMeetings: "אני רוצה לארח חוגי בית",
        volunteer: "אני רוצה להתנדב"
      },
      privacyText: "אני מאשר/ת את איסוף ושימוש במידע שלי בהתאם ל",
      privacyLink: "מדיניות הפרטיות",
      receiveUpdatesText: "אני מאשר/ת לקבל עדכונים, חדשות ומידע על הקמפיין באימייל ו/או SMS",
      submitButton: "הצטרפו",
      successMessage: "תודה! פרטיכם נשמרו בהצלחה.",
      errorMessage: "אירעה שגיאה. אנא נסו שוב.",
      popup: {
        title: "!תודה שהצטרפתם",
        text: "הפרטים שלכם נשמרו בהצלחה. מוזמנים להצטרף לקבוצת הוואטסאפ שלנו ולהירשם למפלגה",
        whatsappButton: "הצטרפו לוואטסאפ",
        registerButton: "התפקדות לדמוקרטים"
      }
    },
    en: {
      title: "Join Me",
      subtitle: "Leave your details and we'll stay in touch",
      fields: {
        name: "Full Name",
        email: "Email",
        phone: "Phone Number",
        city: "City"
      },
      howCanIHelp: "How can I help?",
      checkboxes: {
        hostMeetings: "I'd like to host house meetings",
        volunteer: "I want to volunteer"
      },
      privacyText: "I agree to the collection and use of my information per the",
      privacyLink: "Privacy Policy",
      receiveUpdatesText: "I agree to receive updates, news, and campaign information via email and/or SMS",
      submitButton: "Join",
      successMessage: "Thank you! Your details were saved successfully.",
      errorMessage: "An error occurred. Please try again.",
      popup: {
        title: "Thank You!",
        text: "Your details were saved successfully. Join our WhatsApp group and register for the party",
        whatsappButton: "Join WhatsApp",
        registerButton: "Register to Party"
      }
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
      designCredit: "עיצוב: ניצן כרוב טייכהולץ",
      photoCredit: "צילום: שם הצלם"
    },
    en: {
      copyright: "© All Rights Reserved",
      designCredit: "Design: Nitsan Kruv Teichholtz",
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
