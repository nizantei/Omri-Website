/* ============================================
   FORM HANDLING
   Validates and submits lead capture forms.
   Ready for Google Sheets / Apps Script backend.
   ============================================ */

(function () {
  'use strict';

  // ── Initialize ─────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setupForms();
  });

  function setupForms() {
    const forms = document.querySelectorAll('.lead-form');
    forms.forEach(form => {
      form.addEventListener('submit', handleSubmit);

      // Real-time validation on blur
      form.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          // Clear error on input
          const field = input.closest('.form-field');
          if (field) field.classList.remove('error');
        });
      });
    });
  }

  // ── Form Submission ────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const messageEl = form.querySelector('.form-message');

    // Get current language for messages
    const lang = document.documentElement.getAttribute('lang') || 'he';

    // Validate all fields
    let isValid = true;
    form.querySelectorAll('input[required]').forEach(input => {
      if (!validateField(input)) isValid = false;
    });

    if (!isValid) return;

    // Collect form data
    const formData = {
      name:          form.querySelector('[name="name"]')?.value?.trim() || '',
      email:         form.querySelector('[name="email"]')?.value?.trim() || '',
      phone:         form.querySelector('[name="phone"]')?.value?.trim() || '',
      city:          form.querySelector('[name="city"]')?.value?.trim() || '',
      hostMeetings:     form.querySelector('[name="hostMeetings"]')?.checked || false,
      volunteer:        form.querySelector('[name="volunteer"]')?.checked || false,
      receiveUpdates:   form.querySelector('[name="receiveUpdates"]')?.checked || false,
      timestamp:     new Date().toISOString(),
      source:        window.location.href,
      language:      lang,
    };

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const endpoint = SETTINGS.form.submissionEndpoint;

      if (endpoint) {
        // ── Submit to Google Apps Script ──────
        await submitToEndpoint(endpoint, formData);
      } else {
        // ── No endpoint configured: log data ──
        console.log('Form submission (no endpoint configured):', formData);

        // Store locally as fallback
        storeLocally(formData);
      }

      // Success — show thank-you popup
      form.reset();
      showThankYouPopup();

    } catch (error) {
      console.error('Form submission error:', error);
      showMessage(messageEl, 'error',
        CONTENT.joinForm[lang].errorMessage);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  // ── Submit to Backend Endpoint ─────────────
  async function submitToEndpoint(endpoint, data) {
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // With no-cors mode, we can't read the response
    // but the request will still reach the server.
    // For proper error handling, switch to cors mode
    // after configuring CORS in your Apps Script.
    return response;
  }

  // ── Local Storage Fallback ─────────────────
  function storeLocally(data) {
    try {
      const KEY = 'pending-leads';
      const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
      existing.push(data);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch (e) {
      // Storage full or unavailable
    }
  }

  // ── Field Validation ───────────────────────
  function validateField(input) {
    const field = input.closest('.form-field');
    if (!field) return true;

    const value = input.value.trim();
    const name = input.name;
    const errorEl = field.querySelector('.field-error');
    const lang = document.documentElement.getAttribute('lang') || 'he';

    let error = '';

    if (input.hasAttribute('required') && !value) {
      error = lang === 'he' ? 'שדה חובה' : 'Required field';
    } else if (name === 'email' && value) {
      if (!isValidEmail(value)) {
        error = lang === 'he' ? 'כתובת אימייל לא תקינה' : 'Invalid email address';
      }
    } else if (name === 'phone' && value) {
      if (!isValidPhone(value)) {
        error = lang === 'he' ? 'מספר טלפון לא תקין' : 'Invalid phone number';
      }
    }

    // Handle privacy checkbox
    if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
      const privacyLabel = input.closest('.checkbox-label');
      if (privacyLabel) {
        privacyLabel.style.color = error ? 'var(--primary-red)' : '';
      }
      return false;
    }

    if (error) {
      field.classList.add('error');
      if (errorEl) errorEl.textContent = error;
      return false;
    }

    field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  // ── Validation Helpers ─────────────────────
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Accept Israeli and international formats
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+?\d{7,15})$/.test(cleaned);
  }

  // ── Show Form Message ──────────────────────
  function showMessage(el, type, text) {
    if (!el) return;
    el.className = 'form-message ' + type;
    el.textContent = text;
    el.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      el.style.display = 'none';
    }, 5000);
  }

  // ── Thank-You Popup ──────────────────────
  function showThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    if (!popup) return;

    // Set button links
    const whatsappBtn = document.getElementById('popupWhatsapp');
    const registerBtn = document.getElementById('popupRegister');
    if (whatsappBtn) whatsappBtn.href = SETTINGS.social.whatsapp || '#';
    if (registerBtn) registerBtn.href = SETTINGS.form.partyRegistrationUrl || '#';

    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');

    // Close handlers
    const closeBtn = document.getElementById('popupClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }
    popup.addEventListener('click', function(e) {
      if (e.target === popup) closePopup();
    });
  }

  function closePopup() {
    const popup = document.getElementById('thankYouPopup');
    if (!popup) return;
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
  }

  // ── Export pending leads (for future DB sync) ──
  window.exportPendingLeads = function () {
    try {
      const leads = JSON.parse(localStorage.getItem('pending-leads') || '[]');
      console.table(leads);
      return leads;
    } catch (e) {
      console.error('Could not read pending leads');
      return [];
    }
  };

  window.clearPendingLeads = function () {
    localStorage.removeItem('pending-leads');
    console.log('Pending leads cleared.');
  };

})();
